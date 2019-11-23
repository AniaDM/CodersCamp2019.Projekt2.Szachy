import {describe, it} from "mocha";
import {expect, assert} from 'chai';
import {Row, Column, Square} from '../../../main/domain/board/square';
import {range} from 'lodash';

describe('Square on board', () => {

    describe("Row", () => {

        Square.availableNumber.forEach(number => {
            it(`can be a number ${number}`, () => {
                const row = Row.fromNumber(number);
                expect(row.number).to.equal(number);
            })
        });

    });

    describe("Column", () => {

        Square.lowercaseAvailableColumns.forEach(columnCharacter => {
            it(`can be a "${columnCharacter}" letter`, () => {
                const column = Column.fromCharacter(columnCharacter);
                expect(column.character).to.equal(columnCharacter.toUpperCase());
                expect(column.number).to.equal(Square.lowercaseAvailableColumns.indexOf(columnCharacter));
            })
        });

        Square.uppercaseAvailableColumns.forEach(columnCharacter => {
            it(`can be a "${columnCharacter}" letter`, () => {
                const column = Column.fromCharacter(columnCharacter);
                expect(column.character).to.equal(columnCharacter);
                expect(column.number).to.equal(Square.uppercaseAvailableColumns.indexOf(columnCharacter));
            })
        });

        Square.availableNumber.forEach(number => {
            const columnCharacter = Square.uppercaseAvailableColumns[number];
            it(`can be a number ${number}, which is column ${columnCharacter}`, () => {
                const column = Column.fromNumber(number);
                expect(column.character).to.equal(columnCharacter);
                expect(column.number).to.equal(number);
            })
        });

    })


});
