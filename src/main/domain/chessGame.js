import Side from "../domain/pieces/side";
import {PieceMoved, PieceNotMoved} from "../domain/board/move";
import PieceFactory from "./pieces/pieceFactory";

export default class ChessGame {

    gameHistory = [];

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
        const beforeMoveIsKingChecked=this.kingIsChecked();
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
            this._saveHistory();
            this.chessBoard = this.chessBoard.movePiece(this.selected.piece, this.selected.square, targetSquare);
            const afterMoveIsKingChecked=this.kingIsChecked();
            if(!afterMoveIsKingChecked){
                if (pieceMovedCallback) {
                   pieceMovedCallback(new PieceMoved(this.selected.piece, pieceAvailableMoves, this.selected.square, targetSquare));
                }
                if(this.chessBoard.checkingCheck()[0]){
                  alert('white king is checked');
                };
                if(this.chessBoard.checkingCheck()[1]){
                  alert('black king is checked');
                };
                this.toggleCurrentSide();
            } else{
                this.gameHistory.pop();
                this.chessBoard = this.chessBoard.movePiece(this.selected.piece,  targetSquare,this.selected.square);
                pieceNotMovedCallback(
                    new PieceNotMoved(
                        this.selected.piece,
                        pieceAvailableMoves,
                        this.selected.square,
                        targetSquare,
                        'King is checked!')
                );
            }
        }
        this._clearSelection();
    }
    kingIsChecked(){  
       return this.currentSide === Side.WHITE ?this.chessBoard.checkingCheck()[0]:this.chessBoard.checkingCheck()[1];
    }
    _saveHistory() {
        this.gameHistory.push({
            side: this.currentSide,
            chessBoard: this.chessBoard,
            timestamp: new Date()
        });
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
    
    isBlackPawnOnTheEndOfTheBoard(pawn, pawnSquare, pawnPiece) {
        if (pawn.name === pawnPiece && pawn.side === Side.BLACK && pawnSquare.row.number === 7) {
            true
        }
    }


    isWhitePawnOnTheEndOfTheBoard(pawn, pawnSquare, pawnPiece) {
        if (pawn.name === pawnPiece && pawn.side === Side.WHITE && pawnSquare.row.number === 0) {
            true
        }
    }
   

    promotePawn(pawnSquare, newPiece) {
        const pawnPiece = "Pawn"
        const pieceOnTheEnd = this.findPieceBySquare(pawnSquare)
        const isPawnOnTheEndOfTheBoard = (pieceOnTheEnd.name === pawnPiece && pieceOnTheEnd.side === Side.BLACK && pawnSquare.row.number === 7) || (pieceOnTheEnd.name === pawnPiece && pieceOnTheEnd.side === Side.WHITE && pawnSquare.row.number === 0)
        if (isPawnOnTheEndOfTheBoard) {
            const promotedPawn = new PieceFactory()
                .createPiece(newPiece, pieceOnTheEnd.side)
            this.chessBoard = this.chessBoard.setPiece(pawnSquare, promotedPawn)
            return promotedPawn
        }
    }

    undoLastMove() {
        const historicalState = this.gameHistory.pop();
        if (historicalState) {
            this.chessBoard = historicalState.chessBoard;
            this.currentSide = historicalState.side;
        }
    }
}
