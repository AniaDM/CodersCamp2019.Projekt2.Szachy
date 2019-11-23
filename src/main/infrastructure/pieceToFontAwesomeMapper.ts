import King from "../domain/pieces/king";
import Queen from "../domain/pieces/queen";
import Bishop from "../domain/pieces/bishop";
import Knight from "../domain/pieces/knight";
import Rook from "../domain/pieces/rook";
import Pawn from "../domain/pieces/pawn";
import {PieceMapper} from "../presentation/pieceMapper";
import Side from "../domain/pieces/side";


export default class PieceToFontAwesomeMapper implements PieceMapper {

    toIcon(name: string, side: Side): string {
        switch (name) {
            case 'King':
                return `<i class="fas fa-chess-king ${side}"></i>`;
            case 'Queen':
                return `<i class="fas fa-chess-queen ${side}"></i>`;
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
