import King from "../domain/pieces/king";
import Queen from "../domain/pieces/queen";
import Bishop from "../domain/pieces/bishop";
import Knight from "../domain/pieces/knight";
import Rook from "../domain/pieces/rook";
import Pawn from "../domain/pieces/pawn";


export default class PieceToFontAwesomeMapper {

    toIcon(name, side) {
        switch (name) {
            case 'King':
                return `<i class="fas fa-chess-king ${side}"></i>`;
            case 'Queen':
                return  `<i class="fas fa-chess-queen ${side}"></i>`;
            case 'Bishop':
                return `<i class="fas fa-chess-bishop ${side}"></i>`;
            case 'Knight':
                return `<i class="fas fa-chess-knight ${side}"></i>`;
            case 'Rook':
                return `<i class="fas fa-chess-rook ${side}"></i>`;
            case 'Pawn':
                return `<i class="fas fa-chess-pawn ${side}"></i>`;
            default:
                throw new Error(`Invalid piece name: ${name}`)
        }
    }

}