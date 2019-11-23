import Piece from "./piece";
import Side from "./side";
import ChessBoard from "../board/chessBoard";
import {Column, Row, Square} from "../board/square";
import {PieceMove} from "./pieceMove";

export default class King extends Piece {

    constructor(side: Side) {
        super(side);
    }

    getAvailableMoves(chessBoard: ChessBoard, currentSquare: Square): PieceMove[] {
        const deltas = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        let normalMoves = [];
        let captureMoves = [];
        for (let delta of deltas) {
            const y = currentSquare.row.number + delta[1];
            const x = currentSquare.column.number + delta[0];
            let moveSquare = Row.isValidRowNumber(y) && Column.isValidColumnNumber(x)
                ? currentSquare.atY(y).atX(x)
                : undefined;
            if (moveSquare && !this.isMoveToSquareImpossible(chessBoard, moveSquare)) {
                normalMoves.push(moveSquare);
            }
            if (moveSquare && this.canCaptureOnSquare(chessBoard, moveSquare)) {
                captureMoves.push(moveSquare);
            }
        }
        normalMoves = normalMoves.map(movableSquare => PieceMove.normalAt(movableSquare));
        captureMoves = captureMoves.map(capturableSquare => PieceMove.captureAt(capturableSquare));
        return normalMoves
            .concat(captureMoves);
    }

    private isMoveToSquareImpossible(chessBoard: ChessBoard, square: Square) {
        return chessBoard.squareIsOccupied(square);
    }
}
