import {Square} from "../board/square";

export class PieceMove {

    type: MoveType;
    square: Square;

    private constructor(type: MoveType, square: Square) {
        this.type = type;
        this.square = square;
    }

    static captureAt(square: Square) {
        return new PieceMove(MoveType.CAPTURE, square);
    }

    static normalAt(square: Square) {
        return new PieceMove(MoveType.NORMAL, square);
    }
}

export enum MoveType {
    NORMAL = "normal",
    CAPTURE = "capture"
}
