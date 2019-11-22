import Piece from './piece';
import {PieceMove} from "./pieceMove";
import Side from "./side";
import ChessBoard from "../board/chessBoard";
import {Column, Row, Square} from "../board/square";

export default class Pawn extends Piece {

    constructor(side: Side) {
        super(side);
    }

    getAvailableMoves(chessBoard: ChessBoard, currentSquare: Square) {
        const delta = this.isWhite() ? -1 : 1;

        const forwardRow = currentSquare.row.number + delta;
        const singleMoveSquare = Row.isValidRowNumber(forwardRow)
            ? currentSquare.atY(forwardRow)
            : null;
        const doubleForwardRow = currentSquare.row.number + 2 * delta;
        const doubleMoveSquare = this.onStartingRow(currentSquare) && Row.isValidRowNumber(doubleForwardRow)
            ? currentSquare.atY(doubleForwardRow)
            : null;

        let normalMovesSquares: Square[] = [];
        if (!singleMoveSquare || this.isMoveToSquareImpossible(chessBoard, singleMoveSquare)) {
            normalMovesSquares = [];
        } else if (!doubleMoveSquare || this.isMoveToSquareImpossible(chessBoard, doubleMoveSquare)) {
            normalMovesSquares = [singleMoveSquare];
        } else {
            normalMovesSquares = [singleMoveSquare, doubleMoveSquare];
        }
        const normalMoves = normalMovesSquares.map(movableSquare => PieceMove.normalAt(movableSquare));

        const captureMoveSquares = [];
        if(Row.isValidRowNumber(forwardRow)){
            const atAheadRow = currentSquare.atY(forwardRow);
            const rightColumn = currentSquare.column.number + 1;
            if (Column.isValidColumnNumber(rightColumn)) {
                captureMoveSquares.push(atAheadRow.atX(rightColumn))
            }
            const leftColumn = currentSquare.column.number - 1;
            if (Column.isValidColumnNumber(leftColumn)) {
                captureMoveSquares.push(atAheadRow.atX(leftColumn))
            }
        }

        return captureMoveSquares
            .filter(square => this.canCaptureOnSquare(chessBoard, square))
            .map(capturableSquare => PieceMove.captureAt(capturableSquare))
            .concat(normalMoves);
    }

    onStartingRow(currentSquare: Square) {
        if (this.side === Side.WHITE) {
            return currentSquare.row.number === 6;
        } else if (this.side === Side.BLACK) {
            return currentSquare.row.number === 1;
        } else {
            return false;
        }
    }

    onEndOfTheBoard(currentSquare: Square.Number){
        return currentSquare === 0 || currentSquare === 7;
    }

    isMoveToSquareImpossible(chessBoard: ChessBoard, square: Square) {
        return !chessBoard.squareInBounds(square.row.number, square.col.number) || chessBoard.squareIsOccupied(square);
    }

}
