import Side from "../domain/pieces/side";
import {PieceMoved, PieceNotMoved} from "../domain/board/move";
import PieceFactory from "./pieces/pieceFactory";
import PieceToFontAwesomeMapper from "../presentation/pieceToFontAwesomeMapper";

export default class ChessGame {

    currentSide = Side.WHITE;
    selected = {
        piece: null,
        square: null,
        availableMoves: null
    };

    static newGame(chessBoard) {
        return new ChessGame(chessBoard);
    }

    constructor(chessBoard) {
        this.chessBoard = chessBoard;
    }


    toggleCurrentSide() {
        this.currentSide === Side.WHITE ? (this.currentSide = Side.BLACK) : (this.currentSide = Side.WHITE);
        return this.currentSide;
    }

    selectPieceAvailableToMoveBySquare(square) {
        const piece = this.findPieceBySquare(square);
        if (this.isSelectable(piece)) {
            const availableMoves = piece.getAvailableMoves(this.chessBoard, square);
            if (availableMoves.length === 0) {
                return null;
            }
            this._selectPiece(piece, square, availableMoves);
            return {piece, availableMoves}
        }
        return null;
    }

    moveSelectedPieceTo(targetSquare, pieceMovedCallback, pieceNotMovedCallback) {
        const pieceAvailableMoves = this.selected.availableMoves;
        if (!this.isPieceToMoveSelected()) {
            pieceNotMovedCallback(
                new PieceNotMoved(
                    this.selected.piece,
                    pieceAvailableMoves,
                    this.selected.square,
                    targetSquare,
                    'Piece to move not selected!')
            );
        }
        const targetIsAvailableToMove = pieceAvailableMoves.map(move => move.square.id).includes(targetSquare.id);
        if (!targetIsAvailableToMove) {
            pieceNotMovedCallback(
                new PieceNotMoved(
                    this.selected.piece,
                    pieceAvailableMoves,
                    this.selected.square,
                    targetSquare,
                    'Selected square is not available for the piece!')
            );
        } else {
            this.chessBoard = this.chessBoard.movePiece(this.selected.piece, this.selected.square, targetSquare);
            if (pieceMovedCallback) {
                pieceMovedCallback(new PieceMoved(this.selected.piece, pieceAvailableMoves, this.selected.square, targetSquare));
            }
            this.toggleCurrentSide();
        }

        this._clearSelection();
    }

    _clearSelection() {
        this.selected = {
            piece: null,
            square: null,
            availableMoves: null
        };
    }


    _selectPiece(piece, square, availableMoves) {
        this.selected.piece = piece;
        this.selected.square = square;
        this.selected.availableMoves = availableMoves;
    }

    isSelectable(piece) {
        return piece && piece.side === this.currentSide;
    }

    isPieceToMoveSelected() {
        return this.selected.piece && this.selected.square;
    }

    findPieceBySquare(square) {
        return this.chessBoard.getPiece(square);
    }

    get board() {
        return this.chessBoard;
    }

    promotePawn(pawnSquare, newPiece) {
        const pawn = this.findPieceBySquare(pawnSquare)
        const pionek = new PieceFactory()
        .createPiece(newPiece, pawn.side)
        console.log(pawn.name)
        console.log(pawn.side)
        console.log(pawnSquare.row.number)
        console.log(pionek)
        console.log(newPiece)
        console.log(pawnSquare)
        console.log(this.chessBoard.setPiece(pawnSquare, pionek))
            if (pawn.name === 'Pawn' && pawn.side === Side.WHITE && pawnSquare.row.number === 0) {
                this.chessBoard = this.chessBoard.setPiece(pawnSquare, pionek)
            


            }
            else if (pawn.name === 'Pawn' && pawn.side === Side.BLACK && pawnSquare.row.number === 7) {
                this.chessBoard = this.chessBoard.setPiece(pawnSquare, pionek)
            }
        return pionek
    }

}
