import Side from './side';

export default class Piece {

    constructor(side) {
        if (side !== Side.WHITE && side !== Side.BLACK) {
            throw new TypeError('Side must be White or Black!')
        }
        if (this.constructor === Piece) {
            throw new TypeError('Abstract class "Piece" cannot be instantiated directly.')
        }

        //if (this.getAvailableMoves === undefined) {
        //    throw new TypeError('Classes extending the "Piece" abstract class have to implement method!');
        //}

        this.side = side;
    }

    getAvailableMoves(chessBoard, currentSquare) {
        return [];
    }

    get name() {
        return this.constructor.name;
    }

    isWhite() {
        return this.side === Side.WHITE;
    }

    isBlack() {
        return this.side === Side.BLACK;
    }

    isCapturableBy(anotherPiece) {
        return this.side !== anotherPiece.side;
    }

}

