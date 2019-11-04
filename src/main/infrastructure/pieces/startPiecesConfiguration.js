import PiecesConfiguration from "../../domain/pieces/piecesConfiguration";


const startConfig = {
    white: {
        King: ['D1'],
        Queen: ['E1'],
        Bishop: ['C1', 'F1'],
        Knight: ['B1', 'G1'],
        Rook: ['A1', 'H1'],
        Pawn: ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2']
    },
    black: {
        King: ['D8'],
        Queen: ['E8'],
        Bishop: ['C8', 'F8'],
        Knight: ['B8', 'G8'],
        Rook: ['A8', 'H8'],
        Pawn: ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7']
    }
};


export default class StartPiecesConfiguration extends PiecesConfiguration {

    constructor() {
        super(startConfig.white, startConfig.black);
    }

}
