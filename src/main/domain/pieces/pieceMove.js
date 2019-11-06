



export class PieceMove {
    constructor(type, square) {
        this.type = type;
        this.square = square;
    }

    static captureAt(square) {
        return new PieceMove(MoveType.CAPTURE, square);
    }

    static normalAt(square) {
        return new PieceMove(MoveType.NORMAL, square);
    }

}


export const MoveType = {
    NORMAL: "normal",
    CAPTURE: "capture"
};




