export default class PiecesConfiguration {

    constructor(whitePieces, blackPieces) {
        this.whitePieces = whitePieces;
        this.blackPieces = blackPieces;

        if (this.whitePieces === undefined) {
            throw new Error('White pieces configuration must be defined!');
        }

        if (this.blackPieces === undefined) {
            throw new Error('Black pieces configuration must be defined!');
        }
    }

}