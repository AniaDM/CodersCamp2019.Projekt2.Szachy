import {PieceName} from "./pieceName";

export type ChessboardPiecesConfig = {
    white: SidePiecesConfig,
    black: SidePiecesConfig
}

export type SidePiecesConfig = {
    [pieceName in PieceName] : string[]
}

export default abstract class PiecesConfiguration {

    private config: ChessboardPiecesConfig;

    protected constructor(whitePieces: SidePiecesConfig, blackPieces: SidePiecesConfig) {
        this.config = {
            white: whitePieces,
            black: blackPieces
        };
        if (this.whitePieces === undefined) {
            throw new Error('White pieces configuration must be defined!');
        }

        if (this.blackPieces === undefined) {
            throw new Error('Black pieces configuration must be defined!');
        }
    }

    get whitePieces() {
        return this.config.white;
    }

    get blackPieces() {
        return this.config.black;
    }
}
