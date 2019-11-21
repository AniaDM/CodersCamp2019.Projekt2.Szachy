import Side from "../pieces/side";
import {Column, Row, Square} from "./square";

const BOARD_SIZE = 8;

/**
 * Szachownica jest niemutowalna (metody nigdy nie zmieniają stanu, ale jeśli modyfikują ustawienie szachów, to zwracają nowy obiekt).
 * Niemutowalność zapewnia, że np. szach, gdy otrzyma szachownicę, nie zmieni ułożenia innych pionków.
 */
export default class ChessBoard {

    constructor(board = ChessBoard._createEmptyBoard()) {
        this.board = board;
    }

    static empty() {
        return new ChessBoard();
    }

    static _createEmptyBoard() {
        const board = new Array(BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(BOARD_SIZE);
        }
        return board;
    }

    movePiece(piece, from, to) {
        return this._cloneBoard()
            .setPiece(from, undefined)
            .setPiece(to, piece);
    }

    setPiece(square, piece) {
        const clone = this._cloneBoard();
        clone.board[square.row.number][square.column.number] = piece;
        return clone;
    }

    getPiece(square) {
        return this.board[square.row.number][square.column.number];
    }

    findPieceSquare(pieceToFind) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(Column.fromNumber(col), Row.fromNumber(row));
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }
    getPieces() {
       
        const pieceTab=[];
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {   
                let index= Square.at(Column.fromNumber(col), Row.fromNumber(row));     
               if (this.getPiece(index) !==undefined){
                   pieceTab.push([this.getPiece(index),index]);
              }
            }
        }
         return pieceTab;
    }
    checkingCheck(){
        const board = this.getPieces();
        board.forEach(item=>{item[0].getAvailableMoves(this,item[1])});
        const whiteKingPiece=board.filter(item=>{return item[0].name==='King'&&item[0].side===Side.WHITE});
        const blackKingPiece=board.filter(item=>{return item[0].name==='King'&&item[0].side===Side.BLACK});
        const whiteKingChecked=whiteKingPiece[0][0].checked;
        const blackKingChecked=blackKingPiece[0][0].checked;
        whiteKingPiece[0][0].checked=false;
        blackKingPiece[0][0].checked=false;
        return [whiteKingChecked,blackKingChecked]
     }
    squareInBounds(colNumber, rowNumber) {
        return (
            0 <= rowNumber && rowNumber < BOARD_SIZE &&
            0 <= colNumber && colNumber < BOARD_SIZE
        );
    }

    squareIsEmpty(square) {
        return this.getPiece(square) === undefined;
    }

    squareIsOccupied(square) {
        return this.getPiece(square) !== undefined;
    }

    _cloneBoard() {
        return new ChessBoard(this.board.map(row => row.slice()));
    }

    get height() {
        return BOARD_SIZE;
    }

    get width() {
        return BOARD_SIZE;
    }
}
