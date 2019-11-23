import {describe, it} from "mocha";
import {expect, assert} from 'chai';
import Pawn from '../../../main/domain/pieces/pawn';
import Side from "../../../main/domain/pieces/side";
import {emptyChessBoard, staringChessBoard} from "../../fixtures";
import {Square} from "../../../main/domain/board/square";
import {PieceMove} from "../../../main/domain/pieces/pieceMove";

describe('Pawn', () => {

    const pawnName = 'Pawn';
    const whitePawn = new Pawn(Side.WHITE);
    const blackPawn = new Pawn(Side.BLACK);

    describe('white pawns', () => {

        it(`should be named ${pawnName}`, () => {
            expect(whitePawn.name).to.equal(pawnName);
        });

        it(`should be on ${Side.WHITE} side`, () => {
            expect(whitePawn.side).to.equal(Side.WHITE);
        });

        it(`should be available to move one or two squares up if have not already moved`, () => {
            const startingBoard = staringChessBoard();
            const startingPawnSquare = Square.at("B", 1);
            const pawnOnBoard = startingBoard.getPiece(startingPawnSquare);
            console.log(startingBoard);
            const availableSquaresToMove = pawnOnBoard.getAvailableMoves(startingBoard, startingPawnSquare)
                .map(availableMove => availableMove.square);

            expect(availableSquaresToMove).to.have.lengthOf(2);
            expect(availableSquaresToMove).to.have.deep.members([Square.at("B", 2), Square.at("B", 3)]);
        });

        it(`should be available to move only one square up if have already moved`, () => {
            const startingBoard = staringChessBoard();
            const startingPawnSquare = Square.at("B", 1);
            const pawnOnBoard = startingBoard.getPiece(startingPawnSquare);
            const pawnSquareToMove = Square.at("B", 2);

            const boardAfterMove = startingBoard.movePiece(pawnOnBoard, startingPawnSquare, pawnSquareToMove);
            const availableSquaresToMove = pawnOnBoard.getAvailableMoves(boardAfterMove, pawnSquareToMove)
                .map(availableMove => availableMove.square);

            expect(availableSquaresToMove).to.have.lengthOf(1);
            expect(availableSquaresToMove).to.have.deep.members([Square.at("B", 3)]);
        });

        it(`cannot move at the top of the board`, () => {
            const startingBoard = staringChessBoard();
            const startingPawnSquare = Square.at("B", 1);
            const pawnOnBoard = startingBoard.getPiece(startingPawnSquare);
            const pawnSquareToMove = Square.at("B", 7);

            const boardAfterMove = startingBoard.movePiece(pawnOnBoard, startingPawnSquare, pawnSquareToMove);
            const availableSquaresToMove = pawnOnBoard.getAvailableMoves(boardAfterMove, pawnSquareToMove)
                .map(availableMove => availableMove.square);

            expect(availableSquaresToMove).to.be.empty;
        });

        it('can move diagonally if there is a piece to capture', () => {
            const startingPawnSquare = Square.at("B", 1);
            const pawnSquareToMove = Square.at("B", 5);
            const startingBoard = staringChessBoard();
            const pawnOnBoard = startingBoard.getPiece(startingPawnSquare);
            const boardAfterMove = startingBoard.movePiece(pawnOnBoard, startingPawnSquare, pawnSquareToMove);

            const moves = pawnOnBoard.getAvailableMoves(boardAfterMove, pawnSquareToMove);

            expect(moves).to.have.deep.members([PieceMove.captureAt(Square.at("A", 6)), PieceMove.captureAt(Square.at("C", 6))]);
        });

    });

    describe('black pawns', () => {

        it(`should be named ${pawnName}`, () => {
            expect(blackPawn.name).to.equal(pawnName);
        });

        it(`should be on ${Side.BLACK} side`, () => {
            expect(blackPawn.side).to.equal(Side.BLACK);
        });

        it(`should be available to move one or two squares down if have not already moved`, () => {
            const startingBoard = staringChessBoard();
            const startingPawnSquare = Square.at("B", 6);
            const pawnOnBoard = startingBoard.getPiece(startingPawnSquare);
            const availableSquaresToMove = pawnOnBoard.getAvailableMoves(startingBoard, startingPawnSquare)
                .map(availableMove => availableMove.square);

            expect(availableSquaresToMove).to.have.lengthOf(2);
            expect(availableSquaresToMove).to.have.deep.members([Square.at("B", 5), Square.at("B", 4)]);
        });

        it(`should be available to move only one square up if have already moved`, () => {
            const startingBoard = staringChessBoard();
            const startingPawnSquare = Square.at("B", 6);
            const pawnOnBoard = startingBoard.getPiece(startingPawnSquare);
            const pawnSquareToMove = Square.at("B", 5);

            const boardAfterMove = startingBoard.movePiece(pawnOnBoard, startingPawnSquare, pawnSquareToMove);
            const availableSquaresToMove = pawnOnBoard.getAvailableMoves(boardAfterMove, pawnSquareToMove)
                .map(availableMove => availableMove.square);

            expect(availableSquaresToMove).to.have.lengthOf(1);
            expect(availableSquaresToMove).to.have.deep.members([Square.at("B", 4)]);
        });

        it(`cannot move at the bottom of the board`, () => {
            const startingBoard = staringChessBoard();
            const startingPawnSquare = Square.at("B", 6);
            const pawnOnBoard = startingBoard.getPiece(startingPawnSquare);
            const pawnSquareToMove = Square.at("B", 0);

            const boardAfterMove = startingBoard.movePiece(pawnOnBoard, startingPawnSquare, pawnSquareToMove);
            const availableSquaresToMove = pawnOnBoard.getAvailableMoves(boardAfterMove, pawnSquareToMove)
                .map(availableMove => availableMove.square);

            expect(availableSquaresToMove).to.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const startingPawnSquare = Square.at("B", 6);
            const pawnSquareToMove = Square.at("B", 2);
            const startingBoard = staringChessBoard();
            const pawnOnBoard = startingBoard.getPiece(startingPawnSquare);
            const boardAfterMove = startingBoard.movePiece(pawnOnBoard, startingPawnSquare, pawnSquareToMove);

            const moves = pawnOnBoard.getAvailableMoves(boardAfterMove, pawnSquareToMove);

            expect(moves).to.have.deep.members([PieceMove.captureAt(Square.at("A", 1)), PieceMove.captureAt(Square.at("C", 1))]);
        });

    });

});


