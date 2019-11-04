import ChessBoardPopulator from "../main/domain/board/chessBoardPopulator";
import PieceFactory from "../main/domain/pieces/pieceFactory";
import StartPiecesConfiguration from "../main/infrastructure/pieces/startPiecesConfiguration";
import ChessBoard from "../main/domain/board/chessBoard";

/*
Fixtures są to gotowe stany początkowe używane do testów.
 */

export function staringChessBoard() {
    return new ChessBoardPopulator(new PieceFactory(), new StartPiecesConfiguration()).populate(ChessBoard.empty());
}

export function emptyChessBoard() {
    return ChessBoard.empty();
}
