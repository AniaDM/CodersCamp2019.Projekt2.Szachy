import Piece from './piece';
import {PieceMove} from "./pieceMove";
import Side from "./side";
import Square from '../board/square'

export default class King extends Piece {    constructor(side) {
       super(side);
       this.checked=false;
   }
   getAvailableMoves(chessBoard, currentSquare) {
       const deltas = [[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]];
       let normalMoves=[];
       let captureMoves=[];
       for(let delta of deltas){
           let moveSquare=chessBoard.squareInBounds(currentSquare.column.number+delta[0], currentSquare.row.number + delta[1])
           ? currentSquare.atY(currentSquare.row.number + delta[1]).atX(currentSquare.column.number+delta[0])
           : null;
           if(moveSquare && !this.isMoveToSquareImpossible(chessBoard, moveSquare)){
                 normalMoves.push(moveSquare);
           }
           if(moveSquare && this.canCaptureOnSquare(chessBoard, moveSquare)){
               captureMoves.push(moveSquare);
           }        
        }
       normalMoves = normalMoves.map(movableSquare => PieceMove.normalAt(movableSquare));
       captureMoves = captureMoves.map(capturableSquare => PieceMove.captureAt(capturableSquare))
       return normalMoves
              .concat(captureMoves);
   }    
   canCaptureOnSquare(chessBoard, square) {
       return chessBoard.squareIsOccupied(square) && chessBoard.getPiece(square).isCapturableBy(this);
   }    
   isMoveToSquareImpossible(chessBoard, square) {
       return !chessBoard.squareInBounds(square.row.number, square.col.number) || chessBoard.squareIsOccupied(square);
   }
  isCapturableBy(anotherPiece){
      
      if(this.side !== anotherPiece.side){
      this.checked=true;
      }
    return false;
   }
     
}