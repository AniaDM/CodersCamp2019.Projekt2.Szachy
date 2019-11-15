import Piece from './piece';
import {
    PieceMove
} from "./pieceMove";

export default class Queen extends Piece {

    constructor(side) {
        super(side);
    }

    getAvailableMoves(chessBoard, currentSquare) {
        let moves = [];
        //Straight moves
        //Vertical down
        for (let i = (currentSquare.row.number + 1); i < 8; i++) {
            let currentColumn = currentSquare.atY(i);
            if (chessBoard.squareIsOccupied(currentColumn) && !this.canCaptureOnSquare(chessBoard, currentColumn)) {
                break;
            }
            moves.push(currentColumn);
            if (this.canCaptureOnSquare(chessBoard, currentColumn)) {
                break;
            }
        };
        //Vertical up
        for (let i = (currentSquare.row.number - 1); i >= 0; i--) {
            let currentColumn = currentSquare.atY(i);
            if (chessBoard.squareIsOccupied(currentColumn) && !this.canCaptureOnSquare(chessBoard, currentColumn)) {
                break;
            }
            moves.push(currentColumn);
            if (this.canCaptureOnSquare(chessBoard, currentColumn)) {
                break;
            }
        };
        //Horizontal right
        for (let i = (currentSquare.column.number + 1); i < 8; i++) {
            let currentRow = currentSquare.atX(i);
            if (chessBoard.squareIsOccupied(currentRow) && !this.canCaptureOnSquare(chessBoard, currentRow)) {
                break;
            }
            moves.push(currentRow);
            if (this.canCaptureOnSquare(chessBoard, currentRow)) {
                break;
            }
        };
        //Horizontal left
        for (let i = (currentSquare.column.number - 1); i >= 0; i--) {
            let currentRow = currentSquare.atX(i);
            if (chessBoard.squareIsOccupied(currentRow) && !this.canCaptureOnSquare(chessBoard, currentRow)) {
                break;
            }
            moves.push(currentRow);
            if (this.canCaptureOnSquare(chessBoard, currentRow)) {
                break;
            }
        };
        //Diagonal moves
        //Up and left
        for (let i = (currentSquare.column.number - 1), j = (currentSquare.row.number - 1); i >= 0; i--, j--) {
            if (j >= 0) {
                let currentDiagonal = currentSquare.atX(i).atY(j);
                if (chessBoard.squareIsOccupied(currentDiagonal) && !this.canCaptureOnSquare(chessBoard, currentDiagonal)) {
                    break;
                }
                moves.push(currentDiagonal);
                if (this.canCaptureOnSquare(chessBoard, currentDiagonal)) {
                    break;
                }
            }
        };
        //Down and right
        for (let i = (currentSquare.column.number + 1), j = (currentSquare.row.number + 1); i < 8; i++, j++) {
            if (j < 8) {
                let currentDiagonal = currentSquare.atX(i).atY(j);
                if (chessBoard.squareIsOccupied(currentDiagonal) && !this.canCaptureOnSquare(chessBoard, currentDiagonal)) {
                    break;
                }
                moves.push(currentDiagonal);
                if (this.canCaptureOnSquare(chessBoard, currentDiagonal)) {
                    break;
                }
            }
        };
        //Down and left
        for (let i = (currentSquare.column.number - 1), j = (currentSquare.row.number + 1); i >= 0; i--, j++) {
            if (j < 8) {
                let currentDiagonal = currentSquare.atX(i).atY(j);
                if (chessBoard.squareIsOccupied(currentDiagonal) && !this.canCaptureOnSquare(chessBoard, currentDiagonal)) {
                    break;
                }
                moves.push(currentDiagonal);
                if (this.canCaptureOnSquare(chessBoard, currentDiagonal)) {
                    break;
                }
            }
        };
        //Up and right
        for (let i = (currentSquare.column.number + 1), j = (currentSquare.row.number - 1); i < 8; i++, j--) {
            if (j >= 0) {
                let currentDiagonal = currentSquare.atX(i).atY(j);
                if (chessBoard.squareIsOccupied(currentDiagonal) && !this.canCaptureOnSquare(chessBoard, currentDiagonal)) {
                    break;
                }
                moves.push(currentDiagonal);
                if (this.canCaptureOnSquare(chessBoard, currentDiagonal)) {
                    break;
                }
            }
        };
        moves = moves.map(movableSquare => PieceMove.normalAt(movableSquare));
        return moves;
    };
    //Check if square is occupied and piece capturable
    canCaptureOnSquare(chessBoard, square) {
        return chessBoard.squareIsOccupied(square) && chessBoard.getPiece(square).isCapturableBy(this);
    };

}