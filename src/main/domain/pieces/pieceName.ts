const pieces = ['King', 'Queen', 'Bishop', 'Knight', 'Rook', 'Pawn'] as const;

export type PieceName = typeof pieces[number];


export function isPieceName(name: any): name is PieceName {
    return pieces.includes(name);
}
