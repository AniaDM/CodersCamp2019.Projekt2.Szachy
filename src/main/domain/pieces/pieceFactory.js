import Piece from './piece';
import King from './king';
import Queen from './queen';
import Bishop from './bishop';
import Knight from './knight';
import Rook from './rook';
import Pawn from './pawn';

export default class PieceFactory {

    createPiece(name, side) {
        switch (name) {
            case 'King':
                return new King(side);
            case 'Queen':
                return new Queen(side);
            case 'Bishop':
                return new Bishop(side);
            case 'Knight':
                return new Knight(side);
            case 'Rook':
                return new Rook(side);
            case 'Pawn':
                return new Pawn(side);
            default:
                throw new Error(`Invalid piece name: ${name}`)
        }
    }

}