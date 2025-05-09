import { MovesType } from "@/helper/types";
import { useEffect } from "react";

export default function Moves({
  playedMoves
}: MovesType) {

  useEffect(()=>{
    const element = document.getElementById('scroll');
    if(element) element.scrollLeft = element?.scrollWidth;
  },[playedMoves.length]);

  return (
    <div id="scroll" className="w-9/10 overflow-x-scroll overflow-y-clip p-2 h-auto scroll-smooth">
      <div className="w-max">
        {playedMoves.map((moveObj, ind) => (
          <span key={ind} className="">
            {ind % 2 === 0 ? `${(ind / 2) + 1}. ` : ''}
            <span className={`p-2 m-2 rounded-lg ${ind===playedMoves.length-1 ? "bg-success" : ""}`}>{moveObj.move}</span>
          </span>
        ))}
      </div>
    </div>
  );
}