import Side from './side';
import {PieceMove} from "./pieceMove";
import ChessBoard from "../board/chessBoard";
import {Square} from "../board/square";
import {PieceName} from "./pieceName";

export default abstract class Piece {

    readonly side: Side;

    protected constructor(side: Side) {
        this.side = side;
    }

    abstract getAvailableMoves(chessBoard: ChessBoard, currentSquare: Square): PieceMove[];

    get name(): PieceName {
        return this.constructor.name as PieceName;
    }

    isWhite() {
        return this.side === Side.WHITE;
    }

    isBlack() {
        return this.side === Side.BLACK;
    }

    isCapturableBy(anotherPiece: Piece) {
        return this.side !== anotherPiece.side;
    }

    protected canCaptureOnSquare(chessBoard: ChessBoard, square: Square) {
        return chessBoard.squareIsOccupied(square) && chessBoard.getPiece(square).isCapturableBy(this);
    };

    protected toPieceMove(chessBoard: ChessBoard) {
        return (movableSquare: Square) => {
            if (this.canCaptureOnSquare(chessBoard, movableSquare)) {
                return PieceMove.captureAt(movableSquare);
            } else {
                return PieceMove.normalAt(movableSquare);
            }
        };
    }
}

