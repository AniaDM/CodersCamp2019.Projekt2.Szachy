import {describe, it} from "mocha";
import {expect} from "chai";
import King from '../../../main/domain/pieces/king';
import Side from "../../../main/domain/pieces/side";
import {staringChessBoard} from "../../fixtures";
import {Square} from "../../../main/domain/board/square";
import {PieceMove, MoveType} from "../../../main/domain/pieces/pieceMove";

describe('moves of piece king', () => {

    const kingName = 'King';
    const whiteKing = new King(Side.WHITE);
    const blackKing = new King(Side.BLACK);
    const startingChessBoard = {
        white: {
            King: ['E1'],
            Queen: ['D1'],
            Bishop: ['C1', 'F1'],
            Knight: ['B1', 'G1'],
            Rook: ['A1', 'H1'],
            Pawn: ['A2', 'B2', 'C2', 'F2', 'G2', 'H2']
        },
        black: {
            King: ['E8'],
            Queen: ['D8'],
            Bishop: ['C8', 'F8'],
            Knight: ['B8', 'G8'],
            Rook: ['A8', 'H8'],
            Pawn: ['A7', 'B7', 'C7', 'F7', 'G7', 'H7']
        }
    };
    describe('white king', () => {

        it(`should be named ${kingName}`, () => {
            expect(whiteKing.name).to.equal(kingName);
        });

        it(`should be on ${Side.WHITE} side`, () => {
            expect(whiteKing.side).to.equal(Side.WHITE);
        });

        it('can  move only in legal directions', () => {
            const startingBoard = staringChessBoard(startingChessBoard);
            const startingKingSquare = Square.at("E", 0);
            const kingOnBoard = startingBoard.getPiece(startingKingSquare);
            const availableSquaresToMove = kingOnBoard.getAvailableMoves(startingBoard, startingKingSquare)
                .map((availableMove: PieceMove) => availableMove.square);

            expect(availableSquaresToMove).to.have.lengthOf(2);
            expect(availableSquaresToMove).to.have.deep.members([Square.at("E", 1), Square.at("D", 1)]);
        });


        it('can move in eight directions', () => {
            const startingKingSquare = Square.at("E", 0);
            const kingSquareToMove = Square.at("E", 4);
            const startingBoard = staringChessBoard();
            const kingOnBoard = startingBoard.getPiece(startingKingSquare);
            const boardAfterMove = startingBoard.movePiece(kingOnBoard, startingKingSquare, kingSquareToMove);
            const availableSquaresToMove = kingOnBoard.getAvailableMoves(boardAfterMove, kingSquareToMove)
                .map((availableMove: PieceMove) => availableMove.square);
            expect(availableSquaresToMove).to.have.lengthOf(8);
            expect(availableSquaresToMove).to.have.deep.members([Square.at("E", 3), Square.at("E", 5), Square.at("D", 3), Square.at("D", 4), Square.at("D", 5), Square.at("F", 3), Square.at("F", 4), Square.at("F", 5)]);
        });

        it('can attack in all avaiable directions', () => {
            const startingKingSquare = Square.at("E", 0);
            const kingSquareToMove = Square.at("B", 5);
            const startingBoard = staringChessBoard();
            const kingOnBoard = startingBoard.getPiece(startingKingSquare);
            const boardAfterMove = startingBoard.movePiece(kingOnBoard, startingKingSquare, kingSquareToMove);

            const moves = kingOnBoard.getAvailableMoves(boardAfterMove, kingSquareToMove);
            const captureMoves = moves.filter((move: PieceMove) => move.type == MoveType.CAPTURE);
            expect(captureMoves).to.have.lengthOf(3);
            expect(captureMoves).to.have.deep.members([PieceMove.captureAt(Square.at("A", 6)), PieceMove.captureAt(Square.at("B", 6)), PieceMove.captureAt(Square.at("C", 6))]);
        });

    });

    describe('black king', () => {

        it(`should be named ${kingName}`, () => {
            expect(blackKing.name).to.equal(kingName);
        });

        it(`should be on ${Side.BLACK} side`, () => {
            expect(blackKing.side).to.equal(Side.BLACK);
        });

        it('can  move only in legal directions', () => {
            const startingBoard = staringChessBoard(startingChessBoard);
            const startingKingSquare = Square.at("E", 7);
            const kingOnBoard = startingBoard.getPiece(startingKingSquare);
            const availableSquaresToMove = kingOnBoard.getAvailableMoves(startingBoard, startingKingSquare)
                .map((availableMove: PieceMove) => availableMove.square);

            expect(availableSquaresToMove).to.have.lengthOf(2);
            expect(availableSquaresToMove).to.have.deep.members([Square.at("E", 6), Square.at("D", 6)]);
        });


        it('can move in eight directions', () => {
            const startingKingSquare = Square.at("E", 7);
            const kingSquareToMove = Square.at("E", 4);
            const startingBoard = staringChessBoard();
            const kingOnBoard = startingBoard.getPiece(startingKingSquare);
            const boardAfterMove = startingBoard.movePiece(kingOnBoard, startingKingSquare, kingSquareToMove);
            const availableSquaresToMove = kingOnBoard.getAvailableMoves(boardAfterMove, kingSquareToMove)
                .map((availableMove: PieceMove) => availableMove.square);
            expect(availableSquaresToMove).to.have.lengthOf(8);
            expect(availableSquaresToMove).to.have.deep.members([Square.at("E", 3), Square.at("E", 5), Square.at("D", 3), Square.at("D", 4), Square.at("D", 5), Square.at("F", 3), Square.at("F", 4), Square.at("F", 5)]);
        });

        it('can attack in all avaiable directions', () => {
            const startingKingSquare = Square.at("E", 7);
            const kingSquareToMove = Square.at("B", 2);
            const startingBoard = staringChessBoard();
            const kingOnBoard = startingBoard.getPiece(startingKingSquare);
            const boardAfterMove = startingBoard.movePiece(kingOnBoard, startingKingSquare, kingSquareToMove);

            const moves = kingOnBoard.getAvailableMoves(boardAfterMove, kingSquareToMove);
            const captureMoves = moves.filter((move: PieceMove) => move.type == MoveType.CAPTURE);
            expect(captureMoves).to.have.lengthOf(3);
            expect(captureMoves).to.have.deep.members([PieceMove.captureAt(Square.at("A", 1)), PieceMove.captureAt(Square.at("B", 1)), PieceMove.captureAt(Square.at("C", 1))]);
        });

    });

});
