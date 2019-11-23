import Side from "../domain/pieces/side";
import {PieceMoved, PieceNotMoved} from "./board/move";
import PieceFactory from "./pieces/pieceFactory";
import ChessBoard from "./board/chessBoard";
import Piece from "./pieces/piece";
import {Square} from "./board/square";
import {PieceMove} from "./pieces/pieceMove";
import Pawn from "./pieces/pawn";
import {isPieceName, PieceName} from "./pieces/pieceName";

export default class ChessGame {

    private readonly gameHistory: GameState[] = [];
    private chessBoard: ChessBoard;

    private currentSide = Side.WHITE;
    private selected: Selected = {};

    static newGame(chessBoard: ChessBoard) {
        return new ChessGame(chessBoard);
    }

    private constructor(chessBoard: ChessBoard) {
        this.chessBoard = chessBoard;
    }

    private toggleCurrentSide() {
        this.currentSide === Side.WHITE ? (this.currentSide = Side.BLACK) : (this.currentSide = Side.WHITE);
        return this.currentSide;
    }

    selectPieceAvailableToMoveBySquare(square: Square): PieceWithMoves | undefined {
        const piece = this.findPieceBySquare(square);
        if (this.isSelectable(piece)) {
            const availableMoves = piece.getAvailableMoves(this.chessBoard, square);
            if (availableMoves.length === 0) {
                return undefined;
            }
            this.selectPiece(piece, square, availableMoves);
            return {piece, availableMoves}
        }
        return undefined;
    }

    moveSelectedPieceTo(
        targetSquare: Square,
        pieceMovedCallback?: (pieceMoved: PieceMoved) => any,
        pieceNotMovedCallback?: (pieceNotMoved: PieceNotMoved) => any
    ) {
        const pieceAvailableMoves = this.selected.availableMoves;
        if (!this.isPieceToMoveSelected() && pieceNotMovedCallback) {
            pieceNotMovedCallback(
                {
                    piece: this.selected.piece!,
                    availableMoves: pieceAvailableMoves!,
                    from: this.selected.square!,
                    to: targetSquare,
                    reason: 'Piece to move not selected!'
                }
            );
        }
        const targetIsAvailableToMove = pieceAvailableMoves!.map(move => move.square.id).includes(targetSquare.id);
        if (!targetIsAvailableToMove && pieceNotMovedCallback) {
            pieceNotMovedCallback(
                {
                    piece: this.selected.piece!,
                    availableMoves: pieceAvailableMoves!,
                    from: this.selected.square!,
                    to: targetSquare,
                    reason: 'Selected square is not available for the piece!'
                }
            );
        } else {
            this.saveHistory();

            this.chessBoard = this.chessBoard.movePiece(this.selected.piece!, this.selected.square!, targetSquare);
            if (pieceMovedCallback) {
                pieceMovedCallback({
                    piece: this.selected.piece!,
                    availableMoves: pieceAvailableMoves!,
                    from: this.selected.square!,
                    to: targetSquare
                });
            }
            this.toggleCurrentSide();
        }

        this.clearSelection();
    }

    private saveHistory() {
        this.gameHistory.push({
            side: this.currentSide,
            chessBoard: this.chessBoard,
            timestamp: new Date()
        });
    }

    private clearSelection() {
        this.selected = {
            piece: undefined,
            square: undefined,
            availableMoves: undefined
        };
    }


    private selectPiece(piece: Piece, square: Square, availableMoves: PieceMove[]) {
        this.selected.piece = piece;
        this.selected.square = square;
        this.selected.availableMoves = availableMoves;
    }

    private isSelectable(piece: Piece) {
        return piece && piece.side === this.currentSide;
    }

    isPieceToMoveSelected() {
        return this.selected.piece && this.selected.square;
    }

    findPieceBySquare(square: Square) {
        return this.chessBoard.getPiece(square);
    }

    get board() {
        return this.chessBoard;
    }

    promotePawn(pawnSquare: Square, newPiece: PieceName): Piece {
        const pawnPiece = "Pawn";
        const pieceOnTheEnd = this.findPieceBySquare(pawnSquare);
        const isBlackPawnOnTheEndOfTheBoard = pieceOnTheEnd.name === pawnPiece && pieceOnTheEnd.side === Side.BLACK && pawnSquare.row.number === 7;
        const isWhitePawnOnTheEndOfTheBoard = pieceOnTheEnd.name === pawnPiece && pieceOnTheEnd.side === Side.WHITE && pawnSquare.row.number === 0;
        const isPawnOnTheEndOfTheBoard = isBlackPawnOnTheEndOfTheBoard || isWhitePawnOnTheEndOfTheBoard;
        if (isPawnOnTheEndOfTheBoard && isPieceName(newPiece)) {
            const promotedPawn = new PieceFactory()
                .createPiece(newPiece, pieceOnTheEnd.side);
            this.chessBoard = this.chessBoard.setPiece(pawnSquare, promotedPawn);
            return promotedPawn
        }
        throw new Error("Piece is not on the end of the board!")
    }

    undoLastMove() {
        const historicalState = this.gameHistory.pop();
        if (historicalState) {
            this.chessBoard = historicalState.chessBoard;
            this.currentSide = historicalState.side;
        }
    }
}

export type PieceWithMoves = {
    piece: Piece,
    availableMoves: PieceMove[]
}

type Selected = {
    piece?: Piece,
    square?: Square,
    availableMoves?: PieceMove[]
}

type GameState = {
    side: Side
    chessBoard: ChessBoard
    timestamp: Date
}
