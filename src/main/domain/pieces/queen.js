import Piece from './piece';
import {PieceMove} from "./pieceMove";
import Side from "./side";
import { Square } from '../board/square';

export default class Queen extends Piece {

    constructor(side) {
        super(side);
    }

    getAvailableMoves(chessBoard, currentSquare) {
        let normalMoves = [];
        for (let i = (currentSquare.row.number + 1); i < 8; i++) {
            if (chessBoard.squareIsOccupied(currentSquare.atY(i)) && !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i))) {
                break;
            }
            normalMoves.push(currentSquare.atY(i));
            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i))) {
                break;
            }
        };
        for (let i = (currentSquare.row.number - 1); i >= 0; i--) {
            if (chessBoard.squareIsOccupied(currentSquare.atY(i)) && !this.canCaptureOnSquare(chessBoard, currentSquare.atY(i))) {
                break;
            }
            normalMoves.push(currentSquare.atY(i));
            if (this.canCaptureOnSquare(chessBoard, currentSquare.atY(i))) {
                break;
            }
        };
        for (let i = (currentSquare.column.number + 1); i < 8; i++) {
            if (chessBoard.squareIsOccupied(currentSquare.atX(i)) && !this.canCaptureOnSquare(chessBoard, currentSquare.atX(i))) {
                break;
            }
            normalMoves.push(currentSquare.atX(i));
            if (this.canCaptureOnSquare(chessBoard, currentSquare.atX(i))) {
                break;
            }
        };
        for (let i = (currentSquare.column.number - 1); i >= 0; i--) {
            if (chessBoard.squareIsOccupied(currentSquare.atX(i)) && !this.canCaptureOnSquare(chessBoard, currentSquare.atX(i))) {
                break;
            }
            normalMoves.push(currentSquare.atX(i));
            if (this.canCaptureOnSquare(chessBoard, currentSquare.atX(i))) {
                break;
            }
        };
        normalMoves = normalMoves.map(movableSquare => PieceMove.normalAt(movableSquare));
        return normalMoves;
    };

    canCaptureOnSquare(chessBoard, square) {
        return chessBoard.squareIsOccupied(square) && chessBoard.getPiece(square).isCapturableBy(this);
    };

}