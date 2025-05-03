'use client'
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function TwoPlayer() {

  const [game, setGame] = useState(new Chess());
  const [suggestion, setSuggestion] = useState<Record<string, { background: string }>>({});
  const from = useRef<{source:Square,selected:boolean}>({source:'a1',selected:false});


  function makeAMove(sourceSquare: Square, targetSquare: Square){
    setSuggestion({});
    try {
      const gameCopy = new Chess(game.fen());
  
      gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", 
      });

      if(gameCopy.isGameOver()) document?.getElementById('game_over_modal')?.showModal();
  
      setGame(gameCopy);

    } catch (error) {
      toast.error("Invalid Move");
      console.error(error);
    }
  };

  function onDrop(sourceSquare: Square, targetSquare: Square): boolean{
    setSuggestion({});
    try {
      const gameCopy = new Chess(game.fen());
  
      gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", 
      });

      if(gameCopy.isGameOver()) document?.getElementById('game_over_modal')?.showModal();
  
      setGame(gameCopy);
      return true;

    } catch (error) {
      toast.error("Invalid Move");
      console.error(error);
      return false;
    }
  };

  function onPieceClick(piece: string, square: Square) {
    const moves = game.moves({
      square
    });
    console.log({piece, square,moves});

    if(moves.length === 0) return;
    const newSquares: Record<string, { background: string }> = {};

    // highlight the possible square
    moves.forEach((move) => {
      let key=move.replace('+',''),color="radial-gradient(circle, rgb(125 125 121 / 44%) 25%, transparent 20%)";
      if(key[1]==='x'){
        key = key.slice(2,4);
        color= '#ff000082'
      }
      else if(key?.length >= 3) key = key.slice(1,3);
      newSquares[key] = {
        background: color,
      };
    });

    // also highlight the clicked square (origin)
    newSquares[square] = {
      background: '#ff990a',
    };

    setSuggestion(newSquares);
  }

  function onSquareClick(square: Square, piece?: string){
    console.log('Square clicked',{square,piece});
    if(piece && !from.current.selected && piece[0] === game.turn()) {
      from.current={
        source: square,
        selected: true
      };
    }
    else if (from.current.selected) {
      if(piece && piece[0] === game.turn()) return;
      makeAMove(from.current.source,square);
      from.current.selected=false;
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:3/10 2xl:1/5 h-full flex items-center">
        <Chessboard
          id="BasicBoard"
          position={game.fen()}
          onPieceDrop={onDrop}
          onPieceClick={onPieceClick}
          onSquareClick={onSquareClick}
          customSquareStyles={suggestion}
        />
      </div>
      <dialog id="game_over_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Game Over</h3>
          <p className="py-4">{`${game.turn()==='b' ? 'White' : 'Black'} Wins`}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}