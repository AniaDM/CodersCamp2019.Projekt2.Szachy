import Side from "../pieces/side";
import { Square } from "./square";
import PieceFactory from "../pieces/pieceFactory";
import PiecesConfiguration, {SidePiecesConfig} from "../pieces/piecesConfiguration";
import ChessBoard from "./chessBoard";
import {PieceName} from "../pieces/pieceName";

export default class ChessBoardPopulator {

    pieceFactory: PieceFactory;
    piecesConfiguration: PiecesConfiguration;

    constructor(pieceFactory: PieceFactory, piecesConfiguration: PiecesConfiguration) {
        this.pieceFactory = pieceFactory;
        this.piecesConfiguration = piecesConfiguration;
    }

    populate(chessBoard: ChessBoard) {
        let tempChessBoard = chessBoard;
        tempChessBoard = this.populateChessBoardForSide(tempChessBoard, this.piecesConfiguration.whitePieces, Side.WHITE);
        tempChessBoard = this.populateChessBoardForSide(tempChessBoard, this.piecesConfiguration.blackPieces, Side.BLACK);
        return tempChessBoard;
    }

    private populateChessBoardForSide(chessBoard: ChessBoard, piecesConfig: SidePiecesConfig, side: Side) {
        let tempChessBoard = chessBoard;
        for (const [pieceName, pieceSquareAlgebricNotation] of Object.entries(piecesConfig)) {
            const piece = this.pieceFactory.createPiece(pieceName as PieceName, side);
            pieceSquareAlgebricNotation.forEach(square => {
                tempChessBoard = tempChessBoard.setPiece(Square.fromAlgebricNotation(square), piece);
            });
        }
        return tempChessBoard;
    }
}
