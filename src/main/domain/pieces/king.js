import Piece from './piece';
import Side from './side';

export default class King extends Piece {

    constructor(side) {
        super(side);
    }

    isCapturableBy(anotherPiece) {
        return false;
    }
}