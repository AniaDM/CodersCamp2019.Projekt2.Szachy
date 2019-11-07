import PiecesConfiguration from "../../domain/pieces/piecesConfiguration";
/*Szachowa notacja algebraiczna – metoda zapisu partii szachowej, powszechnie stosowana podczas oficjalnych zawodów szachowych, w fachowej literaturze i czasopismach, 
w szachach korespondencyjnych, a także przez programy szachowe. 
Notacja bazuje na jednoznacznym nazwaniu każdego pola szachownicy za pomocą jego współrzędnych. Kolumny (pionowe linie) są oznaczone małymi literami od a do h, 
począwszy od lewej (dla białych) strony szachownicy. Rzędy szachownicy (linie poziome) są ponumerowane od 1 do 8, począwszy od pierwszej linii białych. ,
Początkowo białe bierki zajmują więc linie 1 i 2, czarne – 7 i 8. 
Każde pole szachownicy jest identyfikowane poprzez literę kolumny oraz cyfrę rzędu, na przecięciu których się znajduje. Na diagramie obok opisano pola lewej dolnej ćwiartki szachownicy. 
Król białych rozpoczyna grę stojąc na polu e1. Czarny skoczek z pola g8 może wykonać ruch na pola f6 lub h6 (albo na e7, jeśli to pole jest wolne). 
Każda figura ozanczona jest wielką literą; K – król, Q – hetman,R – wieża, B – goniec,N – skoczek, piony nie mają oznaczenia.*/


export default class AlgebricNotationConfiguration extends PiecesConfiguration {

    constructor(whitePieces, blackPieces) {
        super(whitePieces, blackPieces);
    }

}