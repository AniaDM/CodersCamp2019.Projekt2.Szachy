import { describe, it } from "mocha";
import { expect, assert } from 'chai';
import { Row, Column, Square, availableColumns } from '../../../main/domain/board/square';
import { range } from 'lodash';

describe('Square on board', () => {

    describe("Row", () => {

        range(0, 8).forEach(number => {
            it(`can be a number ${number}`, () => {
                const row = Row.fromNumber(number);
                expect(row.number).to.equal(number);
            })
        });

        new Array(-1, 9, 10, 100).forEach(number => {
            it(`cannot be a number like ${number}`, () => {
                assert.throws(() => Row.fromNumber(number), Error);
            })
        })


    });

    describe("Column", () => {

        availableColumns.forEach(columnCharacter => {
            it(`can be a "${columnCharacter}" letter`, () => {
                const column = Column.fromCharacter(columnCharacter)
                expect(column.character).to.equal(columnCharacter);
                expect(column.number).to.equal(availableColumns.indexOf(columnCharacter));
            })
        });

        range(0, 8).forEach(number => {
            const columnCharacter = availableColumns[number];
            it(`can be a number ${number}, which is column ${columnCharacter}`, () => {
                const column = Column.fromNumber(number);
                expect(column.character).to.equal(columnCharacter);
                expect(column.number).to.equal(number);
            })
        });

        new Array(-1, 9, 10, 100).forEach(number => {
            it(`cannot be a number like ${number}`, () => {
                assert.throws(() => Column.fromNumber(number), Error);
            })
        })

    })


});
