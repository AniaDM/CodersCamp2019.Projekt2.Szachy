import { Square, Row, Column, } from "./square";
import { MoveType } from "../pieces/pieceMove";
import { SetPiece } from "../board/chessBoard";



var historyGame = [];

export class PieceMoved {

    constructor(piece, availableMoves, from, to) {
        this.piece = piece;
        this.availableMoves = availableMoves;
        this.from = from;
        this.to = to;
       
        }
        
    //     cons(){
    //         historyGame.push(this.piece);
          

    //         console.log(historyGame);
           
         
    // }


PreviousMove(){
    // historyGame.push(parseInt(Row));
    // historyGame.push(PieceMoved[this.from])

    PieceMoved.prototype.cons();

}

}

export class PieceNotMoved {

    constructor(piece, availableMoves, from, to, reason) {
        this.piece = piece;
        this.availableMoves = availableMoves;
        this.from = from;
        this.to = to;
        this.reason = reason;
    }
}


