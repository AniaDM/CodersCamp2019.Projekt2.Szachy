import Side from './side';
import {PieceMove} from "./pieceMove";
import ChessBoard from "../board/chessBoard";
import {Square} from "../board/square";

export default abstract class Piece {

    side: Side;

    protected constructor(side: Side) {
        if (side !== Side.WHITE && side !== Side.BLACK) {
            throw new TypeError('Side must be White or Black!')
        }
        if (this.constructor === Piece) {
            throw new TypeError('Abstract class "Piece" cannot be instantiated directly.')
        }

        //if (this.getAvailableMoves === undefined) {
        //    throw new TypeError('Classes extending the "Piece" abstract class have to implement method!');
        //}

        this.side = side;
    }

    abstract getAvailableMoves(chessBoard: ChessBoard, currentSquare: Square): PieceMove[];

    get name() {
        return this.constructor.name;
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

