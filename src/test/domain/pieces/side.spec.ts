import { describe, it } from "mocha";
import { expect } from 'chai';
import Side from '../../../main/domain/pieces/side';

describe('Piece side', () => {

    
    describe("White", () => {

        it('should be able to found by "W" string', () => {
            expect(Side.findByString('W')).to.equal(Side.WHITE);
        })

    })


});
