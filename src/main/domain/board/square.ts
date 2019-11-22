export const SQUARE_ID_SEPARATOR = '-';

export class Square {

    column;
    row;

    static at(column, row) {
        if(typeof column === 'string'){
            column = Column.fromCharacter(column);
        }else if(typeof column === 'number'){
            column = Column.fromNumber(column);
        } else if (!(column instanceof Column)) {
            throw new TypeError(`Invalid column value: ${column}!`);
        }
        if(typeof row === 'number'){
            row = Row.fromNumber(row);
        }else if (!(row instanceof Row)) {
            throw new TypeError(`Invalid row value: ${row}!`);
        }
        return new Square(column, row);
    }

    static fromAlgebricNotation(notation) {
        const algebricColumn = notation.charAt(0);
        const algebricRow = 8 - parseInt(notation.charAt(1));
        return new Square(Column.fromCharacter(algebricColumn), Row.fromNumber(algebricRow));
    }

    constructor(column, row) {
        this.column = column;
        this.row = row;
    }

    get col() {
        return this.column;
    }

    atColumn(column) {
        return new Square(column, this.row);
    }

    atRow(row) {
        return new Square(this.column, row);
    }

    atX(x) {
        return this.atColumn(Column.fromNumber(x));
    }

    atY(y) {
        return this.atRow(Row.fromNumber(y));
    }

    get id() {
        return `${this.column.number}${SQUARE_ID_SEPARATOR}${this.row.number}`;
    }

    get algebricNotation(){
        return `${this.column.character}${this.row.number}`
    }

}


export class Row {

    number;

    static fromNumber(rowNumber) {
        return new Row(rowNumber);
    }

    constructor(rowNumber) {
        if (typeof (rowNumber) !== 'number') {
            throw new TypeError('Row number must be a number.');
        }
        if (rowNumber < 0 || rowNumber > 7) {
            throw new Error('Row number must be a number from 0 to 7.');
        }
        this.number = rowNumber;
    }

}

export const availableColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export class Column {

    character;

    constructor(columnCharacter) {
        if (!columnCharacter || !Column.isValidColumnCharacter(columnCharacter)) {
            throw new Error('Column character must be defined as string from "a" to "h"!');
        }
        this.character = columnCharacter;
    }

    static fromNumber(columnNumber) {
        if (typeof (columnNumber) !== 'number') {
            throw new TypeError('Column number must be a number.');
        }
        if (columnNumber < 0 || columnNumber > 7) {
            throw new Error('Column number must be a number from 0 to 7.');
        }
        return this.fromCharacter(availableColumns[columnNumber]);
    }

    static fromCharacter(columnCharacter) {
        if (typeof (columnCharacter) !== 'string') {
            throw new TypeError("Character value must be a string.");
        }
        return new Column(columnCharacter.toLowerCase());
    }

    static isValidColumnCharacter(columnCharacter) {
        return availableColumns.includes(columnCharacter.toLowerCase());
    }

    get number() {
        return availableColumns.indexOf(this.character);
    }



}

