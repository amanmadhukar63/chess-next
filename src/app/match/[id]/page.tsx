'use client'
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSearchParams } from 'next/navigation'
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import toast from 'react-hot-toast';
import { PlayedMovesType, PromotionType } from '@/helper/types';
import { BoardOrientation } from 'react-chessboard/dist/chessboard/types';
import { backendBaseUrl } from '@/constants.js';

export default function Page({params}:{
  params: Promise<{ id: string }>
}){
  const {id} = React.use(params);
  const socketRef = useRef<Socket | null>(null);
  const color = useRef<BoardOrientation>('white');
  const [waiting, setWaiting] = useState<boolean>(true);

  const searchParams = useSearchParams()
  const method = searchParams.get('method')

  //from here
  const [game, setGame] = useState(new Chess());
  const [playedMoves, setPlayedMoves] = useState<PlayedMovesType>([]);
  const [suggestion, setSuggestion] = useState<Record<string, { background: string, move: string }>>({});
  const from = useRef<{source:Square,selected:boolean}>({source:'a1',selected:false});
  const [promotionPending, setPromotionPending] = useState<PromotionType| null>(null);

  function onDrop(sourceSquare: Square, targetSquare: Square): boolean{
    if(playedMoves && promotionPending){
      console.log('do nothing')
    }
    const piece = game.get(sourceSquare);
    if(color.current[0]!==game.turn() || piece?.color!==game.turn()) return false;
    if(!sourceSquare || !targetSquare) return false;
    setSuggestion({});
    try {
      // const gameCopy = new Chess(game.fen());
  
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", 
      });

      if(game.isGameOver()) (document.getElementById('game_over_modal') as HTMLDialogElement)?.showModal();
  
      setGame(game);
      return true;

    } catch (error) {
      toast.error("Invalid Move");
      console.error(error);
      return false;
    }
  };

  function onPieceClick(piece: string, square: Square) {
    if(color.current[0]!==game.turn()) return;
    const moves = game.moves({
      square
    });
    console.log({piece, square,moves});

    if(moves.length === 0) return;
    const newSquares: Record<string, { background: string, move: string }> = {};

    // highlight the possible square
    moves.forEach((move) => {
      let key=move.replace('+',''),color="radial-gradient(circle, rgb(125 125 121 / 44%) 25%, transparent 20%)";
      if(key[1]==='x'){
        key = key.slice(2,4);
        color= '#ff000082'
      }
      else if(key==='O-O-O' || key==='O-O'){
        key= game.turn()==='w'? key=== 'O-O' ? 'g1' : 'c1' : key=== 'O-O' ? 'g8' : 'c8'
      }
      else if(key.includes('=')) key = key.split('=')[0].slice(-2);
      else if(key?.length >= 3) key = key.slice(1,3);
      newSquares[key] = {
        background: color,
        move
      };
    });

    // also highlight the clicked square (origin)
    newSquares[square] = {
      background: '#ff990a',
      move: ''
    };

    setSuggestion(newSquares);
  }

  function onSquareClick(square: Square, piece?: string){
    console.log('Square clicked',{square,piece});
    if(piece && piece[0] === game.turn()) {
      from.current={
        source: square,
        selected: true
      };
    }
    else if (from.current.selected) {
      if(suggestion && suggestion?.[square]?.move) setPlayedMoves( prev => {
        return [
          ...prev,
          {
            move: suggestion[square].move,
            from: from.current.source,
            to: square
          }
        ]});
      makeAMove(from.current.source,square,'q',true);
      from.current.selected=false;
    }
  }

  function makeAMove(sourceSquare: Square, targetSquare: Square, promotion="q",flag=false){
    setSuggestion({});
    const piece = game.get(sourceSquare);
    const isPromotion =
      piece?.type === "p" &&
      ((piece.color === "w" && targetSquare[1] === "8") ||
       (piece.color === "b" && targetSquare[1] === "1"));
    if (isPromotion) {
      // Delay the move and show the promotion dialog
      setPromotionPending({ from: sourceSquare, to: targetSquare });
      return;
    }
    try {
  
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion, 
      });

      if(flag){
        socketRef.current?.emit('move',{
          roomId:id,
          move:{
            from: sourceSquare,
            to: targetSquare,
            promotion, 
          }
        })
      }

      if(game.isGameOver()) (document.getElementById('game_over_modal') as HTMLDialogElement)?.showModal();

    } catch (error) {
      toast.error("Invalid Move");
      console.error(error);
    }
  };
  //to here

  useEffect(() => {
    if(id){
      socketRef.current = io(
        backendBaseUrl,
        {
          path: "/api/socketio",
        }
      );

      socketRef.current.emit('joinRoom', id);

      socketRef.current.on('opponentMove', (move) => {
        console.log('got opponents move',move);
        makeAMove(move?.from,move?.to,move?.promotion);
      });

      socketRef.current.on('player_joined', ({
        message,
        player1,
        player2,
        waiting
      }) => {
        if(method==='create') color.current = player1;
        else color.current = player2;
        setWaiting(waiting);
        console.log('player joined',{message,method});
      });
    }

    return () => {
      if(socketRef.current) socketRef.current.disconnect();
    };
  }, [id]);

  return (
    <>
    {
      waiting ?
      <div className='m-16'>
      Game Id: {id}
      <div>Waiting....</div>
    </div>
    :
    <>
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:3/10 2xl:1/5 flex flex-col items-center">
          <Chessboard
            id="BasicBoard"
            position={game.fen()}
            onPieceDrop={onDrop}
            onPieceClick={onPieceClick}
            onSquareClick={onSquareClick}
            customSquareStyles={suggestion}
            boardOrientation={color.current}
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
    </>
    }
    </>
  );
}