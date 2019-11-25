import {Square, Column, Row} from "../domain/board/square";
import Side from "../domain/pieces/side";
import King from "../domain/pieces/king";

const ICON_HTML_TAG_NAME = 'I';
const SQUARE_ID_COLUMN_INDEX = 0;
const SQUARE_ID_ROW_INDEX = 2;
const CSS_AVAILABLE_MOVE_CLASS_NAME = 'available-move';


export default class ChessBoardView {

    constructor(pieceMapper, chessGame) {
        this.pieceMapper = pieceMapper;
        this.chessGame = chessGame;
        this._showChessBoard();
        this._registerBoardClickListener();
        this.btn = document.querySelector("#undoBtn").addEventListener("click",this._undoLastMove.bind(this));
    }


    _showChessBoard() {
        for (let row = 0; row < this.chessGame.board.width; row++) {

            for (let column = 0; column < this.chessGame.board.height; column++) {
                const squareView = document.createElement('div');
                const square = Square.at(Column.fromNumber(column), Row.fromNumber(row));
                squareView.id = square.id;
                const piece = this.chessGame.findPieceBySquare(square);
                squareView.innerHTML = piece ? this.pieceMapper.toIcon(piece.name, piece.side) : '';
                squareView.className = 'square';
                squareView.className += row % 2 == column % 2 ? ' light' : ' dark';
                this._boardHtmlElement().appendChild(squareView);
            }
        }
    }

    _clearChessBoard(){
        while (this._boardHtmlElement().firstChild) {
            this._boardHtmlElement().removeChild(this._boardHtmlElement().firstChild);
        }
    }




    _boardHtmlElement() {
        return document.getElementById('board');
    }

    _registerBoardClickListener() {
        this._boardHtmlElement().addEventListener('click', this._boardTouched.bind(this))
    }

    makeTheIcon(IdPieceToChange, PieceName, PieceSide) {
         document.getElementById(IdPieceToChange).innerHTML = this.pieceMapper.toIcon(PieceName, PieceSide);

    }

    _boardTouched(clickEvent) {
        if (!this.chessGame.isPieceToMoveSelected()) {
            this.selectPieceToMove(clickEvent);
        } else {
            const targetSquareToMoveSelectedPiece = this._clickedSquare(clickEvent);
            this.chessGame.moveSelectedPieceTo(
                targetSquareToMoveSelectedPiece,
                pieceMoved => {
                    document.getElementById(pieceMoved.from.id).innerHTML = '';
                    this.makeTheIcon(pieceMoved.to.id, pieceMoved.piece.name, pieceMoved.piece.side);
                    this._hideAvailableMoves(pieceMoved.availableMoves);
                    this.checkingPromote(pieceMoved);
                   
                },
                pieceNotMoved => {
                    this._hideAvailableMoves(pieceNotMoved.availableMoves);
                   
                }
            );
        }
    }
    
  
    checkingPromote(pieceMoved) {
        const pawnPiece = "Pawn"
        const pawnSquare = pieceMoved.to
        const isPawnOnTheEndOfTheBoard = (pieceMoved.piece.name === pawnPiece && pieceMoved.piece.side === Side.BLACK && pawnSquare.row.number === 7) || (pieceMoved.piece.name === pawnPiece && pieceMoved.piece.side === Side.WHITE && pawnSquare.row.number === 0)
        if (isPawnOnTheEndOfTheBoard) {
            this.showPromoteModal(pawnSquare)
        }
    }

    showPromoteModal(pawnSquare) {
        const newPiece = prompt("You can promote your pawn. Choose the new piece.", "bishop, knight, queen, rook")
        const promoted = this.chessGame.promotePawn(pawnSquare, newPiece);
        this.makeTheIcon(pawnSquare.id, promoted.name, promoted.side);

    }


    selectPieceToMove(clickEvent) {
        const selectedSquare = this._clickedSquare(clickEvent);
        const pieceWithMoves = this.chessGame.selectPieceAvailableToMoveBySquare(selectedSquare);
        if (pieceWithMoves) {
            this._showAvailableMoves(pieceWithMoves.availableMoves);
        }
    }

    _clickedSquare(clickEvent) {
        const squareId = this.isIconClicked(clickEvent) ? clickEvent.target.parentNode.id : clickEvent.target.id;
        const squareColumnNumber = parseInt(squareId[SQUARE_ID_COLUMN_INDEX]);
        const squareRowNumber = parseInt(squareId[SQUARE_ID_ROW_INDEX]);
        return Square.at(Column.fromNumber(squareColumnNumber), Row.fromNumber(squareRowNumber));
    }

    isIconClicked(clickEvent) {
        return clickEvent.target.tagName === ICON_HTML_TAG_NAME;
    }

    _showAvailableMoves(moves) {
       
        for (let move of moves) {
            document.getElementById(move.square.id).classList.add(CSS_AVAILABLE_MOVE_CLASS_NAME);
        }
    }
    _hideAvailableMoves(availableMoves) {
        if (availableMoves) {
            availableMoves.forEach(move => {
                    const squareId = move.square.id;
                    document.getElementById(squareId).classList.remove(CSS_AVAILABLE_MOVE_CLASS_NAME);
                }
            );
        }
    }

    _undoLastMove() {
        this.chessGame.undoLastMove();
        this._clearChessBoard();
        this._showChessBoard();
    }

}
