import {Square, Column, Row} from "../domain/board/square";
import Side from "../domain/pieces/side";
import {PieceMapper} from "./pieceMapper";
import ChessGame from "../domain/chessGame";
import {PieceMoved} from "../domain/board/move";
import {PieceMove} from "../domain/pieces/pieceMove";
import {isPieceName} from "../domain/pieces/pieceName";
import {isDefined, isNotNull} from "../domain/utils";
import Piece from "../domain/pieces/piece";

const ICON_HTML_TAG_NAME = 'I';
const SQUARE_ID_COLUMN_INDEX = 0;
const SQUARE_ID_ROW_INDEX = 2;
const CSS_AVAILABLE_MOVE_CLASS_NAME = 'available-move';


export default class ChessBoardView {

    pieceMapper: PieceMapper;
    chessGame: ChessGame;

    constructor(pieceMapper: PieceMapper, chessGame: ChessGame) {
        this.pieceMapper = pieceMapper;
        this.chessGame = chessGame;
        this.showChessBoard();
        this.registerBoardClickListener();
        this.registerUndoButtonClickListener();
    }

    private showChessBoard() {
        for (let row = 0; row < this.chessGame.board.width; row++) {

            for (let column = 0; column < this.chessGame.board.height; column++) {
                const squareView = document.createElement('div');
                const square = Square.at(Column.fromNumber(column as Square.Number), Row.fromNumber(row as Square.Number));
                squareView.id = square.id;
                const piece = this.chessGame.findPieceBySquare(square);
                squareView.innerHTML = piece ? this.pieceMapper.toIcon(piece.name, piece.side) : '';
                squareView.className = 'square';
                squareView.className += row % 2 == column % 2 ? ' light' : ' dark';
                this.boardHtmlElement()!.appendChild(squareView);
            }
        }
    }

    private clearChessBoard() {
        while (this.boardHtmlElement()!.firstChild) {
            this.boardHtmlElement()!.removeChild(this.boardHtmlElement().firstChild!);
        }
    }

    private boardHtmlElement() {
        return document.getElementById('board')!;
    }

    private registerBoardClickListener() {
        this.boardHtmlElement()!.addEventListener('click', this.boardTouched.bind(this))
    }


    private registerUndoButtonClickListener() {
        document.querySelector("#undoBtn")!.addEventListener("click", this.undoLastMove.bind(this));
    }

    private makeTheIcon(pieceToChangeId: string, pieceName: string, pieceSide: Side) {
        document.getElementById(pieceToChangeId)!.innerHTML = this.pieceMapper.toIcon(pieceName, pieceSide);

    }

    private boardTouched(clickEvent: MouseEvent) {
        if (!this.chessGame.isPieceToMoveSelected()) {
            this.selectPieceToMove(clickEvent);
        } else {
            const targetSquareToMoveSelectedPiece = this.clickedSquare(clickEvent);
            this.chessGame.moveSelectedPieceTo(
                targetSquareToMoveSelectedPiece,
                pieceMoved => {
                    document.getElementById(pieceMoved.from.id)!.innerHTML = '';
                    this.makeTheIcon(pieceMoved.to.id, pieceMoved.piece.name, pieceMoved.piece.side);
                    this.hideAvailableMoves(pieceMoved.availableMoves);
                    console.log(pieceMoved);
                    this.checkingPromote(pieceMoved)
                },
                pieceNotMoved => {
                    this.hideAvailableMoves(pieceNotMoved.availableMoves);
                    console.log(pieceNotMoved);
                }
            );
        }
    }

    private checkingPromote(pieceMoved: PieceMoved) {
        const pawnPiece = "Pawn";
        const pawnSquare = pieceMoved.to;
        const isPawnOnTheEndOfTheBoard = (pieceMoved.piece.name === pawnPiece && pieceMoved.piece.side === Side.BLACK && pawnSquare.row.number === 7) || (pieceMoved.piece.name === pawnPiece && pieceMoved.piece.side === Side.WHITE && pawnSquare.row.number === 0);
        if (isPawnOnTheEndOfTheBoard) {
            this.showPromoteModal(pawnSquare)
        }
    }

    private showPromoteModal(pawnSquare: Square) {
        const newPiece = prompt("You can promote your pawn. Choose the new piece.", "bishop, knight, queen, rook");
        if (isNotNull(newPiece)) {
            const newPieceName = newPiece!.charAt(0).toUpperCase() + newPiece!.slice(1);
            if (isPieceName(newPieceName) && newPieceName !== "Pawn") {
                const promoted = this.chessGame.promotePawn(pawnSquare, newPieceName);
                this.makeTheIcon(pawnSquare.id, promoted.name, promoted.side);
            } else {
                this.showInvalidPieceNameAlert(newPiece, pawnSquare);
            }
        } else {
            this.showInvalidPieceNameAlert(newPiece, pawnSquare);
        }

    }


    private showInvalidPieceNameAlert(newPiece: string | null, pawnSquare: Square) {
        alert("Invalid piece name: " + newPiece);
        this.showPromoteModal(pawnSquare);
    }

    private selectPieceToMove(clickEvent: MouseEvent) {
        const selectedSquare = this.clickedSquare(clickEvent);
        const pieceWithMoves = this.chessGame.selectPieceAvailableToMoveBySquare(selectedSquare);
        if (pieceWithMoves) {
            this.showAvailableMoves(pieceWithMoves.availableMoves);
        }
    }

    private clickedSquare(clickEvent: MouseEvent) {
        const eventTarget = clickEvent.target as Element;
        const squareId = this.isIconClicked(clickEvent) ? (eventTarget.parentNode as Element).id : eventTarget.id;
        const squareColumnNumber = parseInt(squareId[SQUARE_ID_COLUMN_INDEX]) as Square.Number;
        const squareRowNumber = parseInt(squareId[SQUARE_ID_ROW_INDEX]) as Square.Number;
        return Square.at(Column.fromNumber(squareColumnNumber), Row.fromNumber(squareRowNumber));
    }

    private isIconClicked(clickEvent: MouseEvent) {
        const eventTarget = clickEvent.target as Element;
        return eventTarget.tagName === ICON_HTML_TAG_NAME;
    }

    private showAvailableMoves(moves: PieceMove[]) {
        for (let move of moves) {
            document.getElementById(move.square.id)!.classList.add(CSS_AVAILABLE_MOVE_CLASS_NAME);
        }
    }

    private hideAvailableMoves(availableMoves: PieceMove[]) {
        if (availableMoves) {
            availableMoves.forEach(move => {
                    const squareId = move.square.id;
                    document.getElementById(squareId)!.classList.remove(CSS_AVAILABLE_MOVE_CLASS_NAME);
                }
            );
        }
    }

    private undoLastMove() {
        this.chessGame.undoLastMove();
        this.clearChessBoard();
        this.showChessBoard();
    }

}
