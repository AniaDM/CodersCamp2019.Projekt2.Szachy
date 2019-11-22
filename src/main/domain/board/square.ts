export const SQUARE_ID_SEPARATOR = '-';

export class Square {
    column: Column;
    row: Row;

    private constructor(column: Column, row: Row) {
        this.column = column;
        this.row = row;
    }

    static at(column: ColumnCharacter | SquareNumber | Column, row: SquareNumber | Row) {
        let newColumn: Column;
        let newRow: Row;

        if (Column.isValidColumnCharacter(column)) {
            newColumn = Column.fromCharacter(column);
        } else if (Column.isValidColumnNumber(column)) {
            newColumn = Column.fromNumber(column);
        } else {
            newColumn = column;
        }

        if (row instanceof Row) {
            newRow = row;
        } else {
            newRow = Row.fromNumber(row)
        }
        return new Square(newColumn, newRow);
    }

    static fromAlgebricNotation(notation: string) {
        const algebricColumn = notation.charAt(0) as ColumnCharacter;
        const algebricRow = (8 - parseInt(notation.charAt(1))) as SquareNumber;
        return new Square(Column.fromCharacter(algebricColumn), Row.fromNumber(algebricRow));
    }

    get col(): Column {
        return this.column;
    }

    atColumn(column): Square {
        return new Square(column, this.row);
    }

    atRow(row): Square {
        return new Square(this.column, row);
    }

    atX(x: SquareNumber): Square {
        return this.atColumn(Column.fromNumber(x));
    }

    atY(y: SquareNumber): Square {
        return this.atRow(Row.fromNumber(y));
    }

    get id(): string {
        return `${this.column.number}${SQUARE_ID_SEPARATOR}${this.row.number}`;
    }

    get algebricNotation(): string {
        return `${this.column.character}${this.row.number}`
    }

}

export type SquareNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export class Row {

    number: number;

    static fromNumber(rowNumber: SquareNumber): Row {
        return new Row(rowNumber);
    }

    constructor(rowNumber: SquareNumber) {
        this.number = rowNumber;
    }

    static isValidRowNumber(rowNumber: any): rowNumber is SquareNumber {
        return (typeof rowNumber === 'number') && rowNumber >= 0 && rowNumber <= 7;
    }

}

export const availableColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export type ColumnCharacter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export class Column {

    character: string;

    constructor(columnCharacter: ColumnCharacter) {
        this.character = columnCharacter;
    }

    static fromNumber(columnNumber: SquareNumber): Column {
        return this.fromCharacter(availableColumns[columnNumber] as ColumnCharacter);
    }

    static fromCharacter(columnCharacter: ColumnCharacter): Column {
        return new Column(columnCharacter);
    }

    static isValidColumnCharacter(columnCharacter: any): columnCharacter is ColumnCharacter {
        return availableColumns.includes(columnCharacter.toLowerCase());
    }

    static isValidColumnNumber(columnNumber: any): columnNumber is SquareNumber {
        return (typeof columnNumber === 'number') && columnNumber >= 0 && columnNumber <= 7;
    }

    get number(): SquareNumber {
        return availableColumns.indexOf(this.character) as SquareNumber;
    }


}

