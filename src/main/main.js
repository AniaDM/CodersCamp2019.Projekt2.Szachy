import StartPiecesConfiguration from "./infrastructure/pieces/startPiecesConfiguration";
import ChessBoard from "./domain/board/chessBoard";
import PieceFactory from "./domain/pieces/pieceFactory";
import ChessBoardPopulator from "./domain/board/chessBoardPopulator";
import PieceToFontAwesomeMapper from "./presentation/pieceToFontAwesomeMapper";
import ChessBoardView from "./presentation/chessBoardView";
import ChessGame from "./application/chessGame";

const piecesConfiguration = new StartPiecesConfiguration();
const chessBoard = new ChessBoardPopulator(new PieceFactory(), piecesConfiguration).populate(ChessBoard.empty());
const pieceMapper = new PieceToFontAwesomeMapper();

const chessGame = ChessGame.newGame(chessBoard);

const view = new ChessBoardView(pieceMapper, chessGame);
