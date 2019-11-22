import Piece from './piece';
import {PieceMove} from "./pieceMove";
import Side from "./side";

export default class Pawn extends Piece {

    constructor(side) {
        super(side);
    }

    getAvailableMoves(chessBoard, currentSquare) {
        const delta = this.isWhite() ? -1 : 1;

        const singleMoveSquare = chessBoard.squareInBounds(currentSquare.column.number, currentSquare.row.number + delta)
            ? currentSquare.atY(currentSquare.row.number + delta)
            : null;
        const doubleMoveSquare = this.onStartingRow(currentSquare) && chessBoard.squareInBounds(currentSquare.column.number, currentSquare.row.number + 2 * delta)
            ? currentSquare.atY(currentSquare.row.number + 2 * delta)
            : null;

        let normalMoves;
        if (!singleMoveSquare || this.isMoveToSquareImpossible(chessBoard, singleMoveSquare)) {
            normalMoves = [];
        } else if (!doubleMoveSquare || this.isMoveToSquareImpossible(chessBoard, doubleMoveSquare)) {
            normalMoves = [singleMoveSquare];
        } else {
            normalMoves = [singleMoveSquare, doubleMoveSquare];
        }
        normalMoves = normalMoves.map(movableSquare => PieceMove.normalAt(movableSquare));

        const captureMoves = [];
        if(chessBoard.squareInBounds(currentSquare.column.number, currentSquare.row.number + delta)){
            const atAheadRow = currentSquare.atY(currentSquare.row.number + delta);
            if (chessBoard.squareInBounds(currentSquare.column.number + 1, atAheadRow.row.number)) {
                captureMoves.push(atAheadRow.atX(currentSquare.column.number + 1))
            }
            if (chessBoard.squareInBounds(currentSquare.column.number - 1, atAheadRow.row.number)) {
                captureMoves.push(atAheadRow.atX(currentSquare.column.number - 1))
            }
        }

        return captureMoves
            .filter(square => this.canCaptureOnSquare(chessBoard, square))
            .map(capturableSquare => PieceMove.captureAt(capturableSquare))
            .concat(normalMoves);
    }

    onStartingRow(currentSquare) {
        if (this.side === Side.WHITE) {
            return currentSquare.row.number === 6;
        } else if (this.side === Side.BLACK) {
            return currentSquare.row.number === 1;
        } else {
            return false;
        }
    }

    onEndOfTheBoard(currentSquare){
        return currentSquare === 0 || currentSquare === 7;
    }

    canCaptureOnSquare(chessBoard, square) {
        return chessBoard.squareIsOccupied(square) && chessBoard.getPiece(square).isCapturableBy(this);
    }

    isMoveToSquareImpossible(chessBoard, square) {
        return !chessBoard.squareInBounds(square.row.number, square.col.number) || chessBoard.squareIsOccupied(square);
    }

}
