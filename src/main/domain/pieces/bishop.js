import Piece from './piece';
import {
    PieceMove
} from "./pieceMove";
import Side from "./side";
import {
    Square
} from '../board/square';

export default class Bishop extends Piece {

    constructor(side) {
        super(side);
    }

    getAvailableMoves(chessBoard, currentSquare) {
        let normalMoves = [];
        console.log(`column = ${currentSquare.column.number}, row = ${currentSquare.row.number}`);

        ///////////////////////// 1 FOR  +Y+X   ///////////////////////////

        for (let i = (currentSquare.row.number + 1), j = 1; i < 8; i++, j++) {

            if ((currentSquare.column.number + j) > 7) {
                break;
            };

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(currentSquare.column.number + j)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number + j))) {
                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(currentSquare.column.number + j)); // movie +X

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number + j))) {
                break;
            }
        };

        ///////////////////////// 2 FOR  -Y+X   ///////////////////////////

        for (let i = currentSquare.row.number - 1, j = 1; i >= 0; i--, j++) {

            if ((currentSquare.column.number + j) > 7) {
                break;
            };

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(currentSquare.column.number + j)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number + j))) {
                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(currentSquare.column.number + j)); // movie +X

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number + j))) {
                break;
            }
        };

        ///////////////////////// 3 FOR +Y-X    ///////////////////////////

     

        for (let i = (currentSquare.row.number + 1), j = 1; i < 8; i++, j++) {

            if ((currentSquare.column.number - j) < 0) {
                i++;
                j++
         
                break;
            };

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(currentSquare.column.number - j)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number - j))) {
                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(currentSquare.column.number - j)); // movie -X

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number - j))) {
                break;
            }
        };


        ///////////////////////// 4 FOR -Y-X    ///////////////////////////

        for (let i = currentSquare.row.number - 1, j = 1; i >= 0; i--, j++) {

            if ((currentSquare.column.number - j) < 0) {
                i++;
                j++

                break;
            };

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(currentSquare.column.number - j)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number - j))) {

                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(currentSquare.column.number - j)); // movie -X

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number - j))) {
      
                break;
            }

        };

        normalMoves = normalMoves.map(movableSquare => PieceMove.normalAt(movableSquare));
        return normalMoves;
    };

    canCaptureOnSquare(chessBoard, square) {
        return chessBoard.squareIsOccupied(square) && chessBoard.getPiece(square).isCapturableBy(this);
    };
};