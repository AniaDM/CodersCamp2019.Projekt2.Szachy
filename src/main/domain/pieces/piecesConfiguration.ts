export default class PiecesConfiguration {

    private config;

    constructor(whitePieces, blackPieces) {
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
