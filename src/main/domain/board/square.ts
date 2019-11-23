export const SQUARE_ID_SEPARATOR = '-';

export class Square {
    readonly column: Column;
    readonly row: Row;

    private constructor(column: Column, row: Row) {
        this.column = column;
        this.row = row;
    }

    static at(column: ColumnCharacter | Square.Number | Column, row: Square.Number | Row) {
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
        const algebricRow = (8 - parseInt(notation.charAt(1))) as Square.Number;
        return new Square(Column.fromCharacter(algebricColumn), Row.fromNumber(algebricRow));
    }

    get col(): Column {
        return this.column;
    }

    atColumn(column: Column): Square {
        return new Square(column, this.row);
    }

    atRow(row: Row): Square {
        return new Square(this.column, row);
    }

    atX(x: Square.Number): Square {
        return this.atColumn(Column.fromNumber(x));
    }

    atY(y: Square.Number): Square {
        return this.atRow(Row.fromNumber(y));
    }

    get id(): string {
        return `${this.column.number}${SQUARE_ID_SEPARATOR}${this.row.number}`;
    }

    get algebricNotation(): string {
        return `${this.column.character}${this.row.number}`
    }

}

/*
More about this:
https://stackoverflow.com/questions/45251664/typescript-derive-union-type-from-tuple-array-values
 */
export namespace Square {
    export type Number = typeof availableNumber[number]
    export const availableNumber = [0, 1, 2, 3, 4, 5, 6, 7] as const;
    export const lowercaseAvailableColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
    export const uppercaseAvailableColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
}

export class Row {

    readonly number: Square.Number;

    static fromNumber(rowNumber: Square.Number): Row {
        return new Row(rowNumber);
    }

    private constructor(rowNumber: Square.Number) {
        this.number = rowNumber;
    }

    static isValidRowNumber(rowNumber: any): rowNumber is Square.Number {
        return Square.availableNumber.includes(rowNumber);
    }

}

type LowerCaseColumnCharacter = typeof Square.lowercaseAvailableColumns[number]
type UpperCaseColumnCharacter = typeof Square.uppercaseAvailableColumns[number]

export type ColumnCharacter = LowerCaseColumnCharacter | UpperCaseColumnCharacter;


export class Column {

    readonly character: ColumnCharacter;
    readonly number: Square.Number;

    private constructor(columnCharacter: ColumnCharacter) {
        this.character = columnCharacter;
        this.number = Square.lowercaseAvailableColumns.indexOf(this.character.toLowerCase() as LowerCaseColumnCharacter) as Square.Number;
    }

    static fromNumber(columnNumber: Square.Number): Column {
        return this.fromCharacter(Square.lowercaseAvailableColumns[columnNumber] as ColumnCharacter);
    }

    static fromCharacter(columnCharacter: ColumnCharacter): Column {
        return new Column(columnCharacter.toUpperCase() as ColumnCharacter);
    }

    static isValidColumnCharacter(columnCharacter: any): columnCharacter is ColumnCharacter {
        return typeof columnCharacter === "string" && Square.lowercaseAvailableColumns.includes(columnCharacter.toLowerCase() as LowerCaseColumnCharacter);
    }

    static isValidColumnNumber(columnNumber: any): columnNumber is Square.Number {
        return Square.availableNumber.includes(columnNumber);
    }

}
