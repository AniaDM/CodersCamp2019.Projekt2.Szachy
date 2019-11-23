import Side from "../domain/pieces/side";

export interface PieceMapper {
    toIcon(name: string, side: Side): string
}
