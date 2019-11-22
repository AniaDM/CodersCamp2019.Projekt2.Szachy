import Piece from './piece';
import {PieceMove} from "./pieceMove";

export default class Rook extends Piece {

    constructor(side) {
        super(side);
    }

    getAvailableMoves(chessBoard, currentSquare) {
        const moves = [];
        //Straight moves
        //Vertical down
        for (let i = (currentSquare.row.number + 1); i < 8; i++) {
            const currentColumn = currentSquare.atY(i);
            if (chessBoard.squareIsOccupied(currentColumn) && !this.canCaptureOnSquare(chessBoard, currentColumn)) {
                break;
            }
            moves.push(currentColumn);
            if (this.canCaptureOnSquare(chessBoard, currentColumn)) {
                break;
            }
        }
        //Vertical up
        for (let i = (currentSquare.row.number - 1); i >= 0; i--) {
            const currentColumn = currentSquare.atY(i);
            if (chessBoard.squareIsOccupied(currentColumn) && !this.canCaptureOnSquare(chessBoard, currentColumn)) {
                break;
            }
            moves.push(currentColumn);
            if (this.canCaptureOnSquare(chessBoard, currentColumn)) {
                break;
            }
        }
        //Horizontal right
        for (let i = (currentSquare.column.number + 1); i < 8; i++) {
            const currentRow = currentSquare.atX(i);
            if (chessBoard.squareIsOccupied(currentRow) && !this.canCaptureOnSquare(chessBoard, currentRow)) {
                break;
            }
            moves.push(currentRow);
            if (this.canCaptureOnSquare(chessBoard, currentRow)) {
                break;
            }
        }
        //Horizontal left
        for (let i = (currentSquare.column.number - 1); i >= 0; i--) {
            const currentRow = currentSquare.atX(i);
            if (chessBoard.squareIsOccupied(currentRow) && !this.canCaptureOnSquare(chessBoard, currentRow)) {
                break;
            }
            moves.push(currentRow);
            if (this.canCaptureOnSquare(chessBoard, currentRow)) {
                break;
            }
        }

        //Normal and capture types of moves
        return moves.map(this.toPieceMove(chessBoard));
    };

    toPieceMove(chessBoard) {
        return movableSquare => {
            if (this.canCaptureOnSquare(chessBoard, movableSquare)) {
                return PieceMove.captureAt(movableSquare);
            } else {
                return PieceMove.normalAt(movableSquare);
            }
        };
    }

}
