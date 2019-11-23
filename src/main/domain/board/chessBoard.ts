import {Column, Row, Square} from "./square";
import Piece from "../pieces/piece";

const BOARD_SIZE = 8;

/**
 * Szachownica jest niemutowalna (metody nigdy nie zmieniają stanu, ale jeśli modyfikują ustawienie szachów, to zwracają nowy obiekt).
 * Niemutowalność zapewnia, że np. szach, gdy otrzyma szachownicę, nie zmieni ułożenia innych pionków.
 */
export default class ChessBoard {

    board: (Piece | undefined)[][];

    constructor(board = ChessBoard.createEmptyBoard()) {
        this.board = board;
    }

    static empty() {
        return new ChessBoard();
    }

    private static createEmptyBoard() {
        const board = new Array(BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(BOARD_SIZE);
        }
        return board;
    }

    movePiece(piece: Piece, from: Square, to: Square) {
        return this._cloneBoard()
            .removePieceFrom(from)
            .setPiece(to, piece);
    }

    setPiece(square: Square, piece: Piece) {
        const clone = this._cloneBoard();
        clone.board[square.row.number][square.column.number] = piece;
        return clone;
    }

    removePieceFrom(square: Square) {
        const clone = this._cloneBoard();
        clone.board[square.row.number][square.column.number] = undefined;
        return clone;
    }

    getPiece(square: Square): Piece {
        return this.board[square.row.number][square.column.number]!;
    }

    findPieceSquare(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(Column.fromNumber(col as Square.Number), Row.fromNumber(row as Square.Number));
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    squareIsEmpty(square: Square) {
        return this.getPiece(square) === undefined;
    }

    squareIsOccupied(square: Square) {
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
