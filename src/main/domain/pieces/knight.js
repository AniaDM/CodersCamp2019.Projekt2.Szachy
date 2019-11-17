import Piece from './piece';
import {
    PieceMove
} from './pieceMove';

import {
    Square
} from '../board/square';


export default class Knight extends Piece {

    constructor(side) {
        super(side);
    }
    getAvailableMoves(chessBoard, currentSquare) {
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
                return chessBoard.squareInBounds(e.column, e.row);
            });


        const normalMoves = moves
            .map(mv => Square.at(mv.column, mv.row))
            .filter(square => !chessBoard.squareIsOccupied(square))
            .map(square => PieceMove.normalAt(square));

        const captureMoves = moves
            .map(mv => Square.at(mv.column, mv.row))
            .filter(square => this.canCaptureOnSquare(chessBoard, square))
            .map(capturableSquare => PieceMove.captureAt(capturableSquare));


        return captureMoves.concat(normalMoves);
    }

    canCaptureOnSquare(chessBoard, square) {
        return chessBoard.squareIsOccupied(square) && chessBoard.getPiece(square).isCapturableBy(this);
    }


}
