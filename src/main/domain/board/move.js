export class PieceMoved {

    constructor(piece, availableMoves, from, to) {
        this.piece = piece;
        this.availableMoves = availableMoves;
        this.from = from;
        this.to = to;
    }
}

export class PieceNotMoved {

    constructor(piece, availableMoves, from, to, reason) {
        this.piece = piece;
        this.availableMoves = availableMoves;
        this.from = from;
        this.to = to;
        this.reason = reason;
    }
}
