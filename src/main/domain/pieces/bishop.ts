import Piece from './piece';
import {PieceMove} from "./pieceMove";
import Side from "./side";
import ChessBoard from "../board/chessBoard";
import {Column, Row, Square} from "../board/square";


export default class Bishop extends Piece {

    constructor(side: Side) {
        super(side);
    }

    getAvailableMoves(chessBoard: ChessBoard, currentSquare: Square) {
        let normalMoves = [];
        console.log(`column = ${currentSquare.column.number}, row = ${currentSquare.row.number}`);

        ///////////////////////// 1 FOR  +Y+X   ///////////////////////////

        for (let i = (currentSquare.row.number + 1) as Square.Number, j = 1; i < 8; i++, j++) {

            const column = currentSquare.column.number + j;
            if (!Column.isValidColumnNumber(column)) {
                break;
            }

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(column)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(column))) {
                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(column)); // movie +X

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(column))) {
                break;
            }
        }

        ///////////////////////// 2 FOR  -Y+X   ///////////////////////////

        for (let i = currentSquare.row.number - 1 as Square.Number, j = 1; i >= 0; i--, j++) {

            const row = currentSquare.column.number + j;
            if (!Row.isValidRowNumber(row)) {
                break;
            }

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(row)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(row))) {
                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(row)); // movie +X

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(row))) {
                break;
            }
        }

        ///////////////////////// 3 FOR +Y-X    ///////////////////////////


        for (let i = (currentSquare.row.number + 1) as Square.Number, j = 1; i < 8; i++, j++) {

            const column = currentSquare.column.number - j;
            if (!Column.isValidColumnNumber(column)) {
                i++;
                j++;

                break;
            }

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(column)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(column))) {
                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(column)); // movie -X

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(column))) {
                break;
            }
        }


        ///////////////////////// 4 FOR -Y-X    ///////////////////////////

        for (let i = currentSquare.row.number - 1 as Square.Number, j = 1; i >= 0; i--, j++) {

            const column = currentSquare.column.number - j;
            if (!Column.isValidColumnNumber(column)) {
                i++;
                j++;

                break;
            }

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(column)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(column))) {

                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(column)); // movie -X

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(column))) {

                break;
            }

        }

        normalMoves = normalMoves.map(movableSquare => PieceMove.normalAt(movableSquare));
        return normalMoves;
    };

};
