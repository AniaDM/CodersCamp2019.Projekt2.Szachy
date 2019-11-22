import {describe, it} from "mocha";
import {expect, assert} from 'chai';
import Queen from '../../../main/domain/pieces/queen';
import Side from "../../../main/domain/pieces/side";
import {staringChessBoard} from "../../fixtures";
import {Square} from "../../../main/domain/board/square";
import {PieceMove, MoveType} from "../../../main/domain/pieces/pieceMove";

const startConfigForCapture = {
    white: {
        King: ['E1'],
        Queen: ['F5'],
    },
    black: {
        King: ['E8'],
        Pawn: ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7']
    }
};

const startConfigForMoves = {
    white: {
        Queen: ['D4'],
    },
    black: {}
};

describe('Queen', () => {

    const queenName = 'Queen';
    const whiteQueen = new Queen(Side.WHITE);
    const blackQueen = new Queen(Side.BLACK);

    it(`should be named ${queenName}`, () => {
        expect(whiteQueen.name).to.equal(queenName);
        expect(blackQueen.name).to.equal(queenName);
    });

    it('should be available to move straight', () => {
        const startingBoard = staringChessBoard(startConfigForMoves);
        const queenSquare = Square.fromAlgebricNotation(startConfigForMoves.white.Queen[0]);
        const queenOnBoard = startingBoard.getPiece(queenSquare);
        const moves = queenOnBoard.getAvailableMoves(startingBoard, queenSquare);
        expect(moves).to.have.deep.include.members([PieceMove.normalAt(Square.at("D", 0)), PieceMove.normalAt(Square.at("D", 1)), PieceMove.normalAt(Square.at("D", 3))]);
    });

    it('should be available to move diagonal', () => {
        const startingBoard = staringChessBoard(startConfigForMoves);
        const queenSquare = Square.fromAlgebricNotation(startConfigForMoves.white.Queen[0]);
        const queenOnBoard = startingBoard.getPiece(queenSquare);
        const moves = queenOnBoard.getAvailableMoves(startingBoard, queenSquare);
        expect(moves).to.have.deep.include.members([PieceMove.normalAt(Square.at("C", 3)), PieceMove.normalAt(Square.at("C", 5)), PieceMove.normalAt(Square.at("E", 3)), PieceMove.normalAt(Square.at("E", 5))]);
    });

    it(`cannot move outside the board`, () => {
        const startingBoard = staringChessBoard(startConfigForMoves);
        const queenSquare = Square.fromAlgebricNotation(startConfigForMoves.white.Queen[0]);
        const queenOnBoard = startingBoard.getPiece(queenSquare);
        const moves = queenOnBoard.getAvailableMoves(startingBoard, queenSquare);

        for (let i = 0; i < moves.lenght - 1; i++) {
            let rowNumber = moves[i].square.row.number;
            assert.isBelow(rowNumber, 8, 'row is less than 8')
        }

        for (let i = 0; i < moves.lenght - 1; i++) {
            let columnNumber = moves[i].square.column.number;
            assert.isBelow(columnNumber, 8, 'column is less than 8')
        }
    });

    it('can move if there is a piece to capture', () => {
        const startingBoard = staringChessBoard(startConfigForCapture);
        const queenSquare = Square.fromAlgebricNotation(startConfigForCapture.white.Queen[0]);
        const queenOnBoard = startingBoard.getPiece(queenSquare);
        const moves = queenOnBoard.getAvailableMoves(startingBoard, queenSquare);
        const captureMoves = moves.filter(move => move.type == MoveType.CAPTURE);
        expect(captureMoves).to.have.deep.members([PieceMove.captureAt(Square.at("D", 1)), PieceMove.captureAt(Square.at("F", 1)), PieceMove.captureAt(Square.at("H", 1))]);
    });
});
