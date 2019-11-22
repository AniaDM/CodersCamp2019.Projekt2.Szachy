import Piece from './piece';
import {PieceMove} from './pieceMove';

import {Column, Row, Square} from '../board/square';
import ChessBoard from "../board/chessBoard";
import Side from "./side";


export default class Knight extends Piece {

    constructor(side: Side) {
        super(side);
    }

    getAvailableMoves(chessBoard: ChessBoard, currentSquare: Square) {
        const legalMoves = [{
            column: 2,
            row: 1
        },
            {
                column: 1,
                row: 2
            },
            {
                column: 1,
                row: -2
            },
            {
                column: 2,
                row: -1
            },
            {
                column: -2,
                row: 1
            },
            {
                column: -1,
                row: 2
            },
            {
                column: -1,
                row: -2
            },
            {
                column: -2,
                row: -1
            }
        ];


        //Znaleźć które z legalMoves mieszczą się w szachownicy
        const moves = legalMoves
            .map(e => {
                const column = currentSquare.column.number + e.column;
                const row = currentSquare.row.number + e.row;
                return {
                    column,
                    row
                }
            })
            .filter(function (e) {
                return Column.isValidColumnNumber(e.column) && Row.isValidRowNumber(e.row)
            });


        const normalMoves = moves
            .map(mv => Square.at(mv.column as Square.Number, mv.row  as Square.Number))
            .filter(square => !chessBoard.squareIsOccupied(square))
            .map(square => PieceMove.normalAt(square));

        const captureMoves = moves
            .map(mv => Square.at(mv.column  as Square.Number, mv.row  as Square.Number))
            .filter(square => this.canCaptureOnSquare(chessBoard, square))
            .map(capturableSquare => PieceMove.captureAt(capturableSquare));


        return captureMoves.concat(normalMoves);
    }


}
