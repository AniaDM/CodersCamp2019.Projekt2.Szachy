import Side from "../pieces/side";
import { Square } from "./square";

export default class ChessBoardPopulator {

    constructor(pieceFactory, piecesConfiguration) {
        this.pieceFactory = pieceFactory;
        this.piecesConfiguration = piecesConfiguration;
    }

    populate(chessBoard) {
        let tempChessBoard = chessBoard;
        tempChessBoard = this.populateChessBoardForSide(tempChessBoard, this.piecesConfiguration.whitePieces, Side.WHITE);
        tempChessBoard = this.populateChessBoardForSide(tempChessBoard, this.piecesConfiguration.blackPieces, Side.BLACK);
        return tempChessBoard;
    }

    populateChessBoardForSide(chessBoard, piecesConfig, side) {
        let tempChessBoard = chessBoard;
        for (const pieceName in piecesConfig) {
            const pieceSquares = piecesConfig[pieceName];
            const piece = this.pieceFactory.createPiece(pieceName, side);
            pieceSquares.forEach(square => {
                tempChessBoard = tempChessBoard.setPiece(Square.fromAlgebricNotation(square), piece);
            });
        }
        return tempChessBoard;
    }
}