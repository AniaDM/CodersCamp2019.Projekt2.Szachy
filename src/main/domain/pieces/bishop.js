import Piece from './piece';
import {PieceMove} from "./pieceMove";
import Side from "./side";
import {Square} from '../board/square';

export default class Bishop extends Piece {

    constructor(side) {
        super(side);
    }

    getAvailableMoves(chessBoard, currentSquare) {
        let normalMoves = [];

        for (let i = (currentSquare.row.number + 1), j = 1; i < 8; i++, j++) {

            if ((currentSquare.column.number + j) > 7) {
                break;
            };

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(currentSquare.column.number + j)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number + j))) {
                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(currentSquare.column.number + j)); 

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number + j))) {
                break;
            }
        };

        for (let i = currentSquare.row.number - 1, j = 1; i >= 0; i--, j++) {

            if ((currentSquare.column.number + j) > 7) {
                break;
            };

            if (chessBoard.squareIsOccupied(currentSquare.atY(i).atX(currentSquare.column.number + j)) &&
                !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number + j))) {
                break;
            }

            normalMoves.push(currentSquare.atY(i).atX(currentSquare.column.number + j)); 

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number + j))) {
                break;
            }
        };

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

            normalMoves.push(currentSquare.atY(i).atX(currentSquare.column.number - j));

            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i).atX(currentSquare.column.number - j))) {
                break;
            }
        };

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

            normalMoves.push(currentSquare.atY(i).atX(currentSquare.column.number - j));

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