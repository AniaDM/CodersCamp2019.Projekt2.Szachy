import Piece from "../pieces/piece";
import {PieceMove} from "../pieces/pieceMove";
import {Square} from "./square";

export type PieceMoved = {
    piece: Piece;
    availableMoves: PieceMove[];
    from: Square;
    to: Square;
}

export type PieceNotMoved = PieceMoved & { reason: string }
