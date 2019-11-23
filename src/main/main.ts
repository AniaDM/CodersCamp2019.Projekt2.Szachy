import StartPiecesConfiguration from "./infrastructure/pieces/startPiecesConfiguration";
import ChessBoard from "./domain/board/chessBoard";
import PieceFactory from "./domain/pieces/pieceFactory";
import ChessBoardPopulator from "./domain/board/chessBoardPopulator";
import ChessBoardView from "./presentation/chessBoardView";
import ChessGame from "./domain/chessGame";
import PieceToFontAwesomeMapper from "./infrastructure/pieceToFontAwesomeMapper";
import {PieceMapper} from "./presentation/pieceMapper";

const piecesConfiguration = new StartPiecesConfiguration();
const chessBoard = new ChessBoardPopulator(new PieceFactory(), piecesConfiguration).populate(ChessBoard.empty());
const pieceMapper: PieceMapper = new PieceToFontAwesomeMapper();

const chessGame = ChessGame.newGame(chessBoard);

const view = new ChessBoardView(pieceMapper, chessGame);
