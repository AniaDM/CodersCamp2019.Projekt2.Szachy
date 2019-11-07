import PiecesConfiguration from "../../domain/pieces/piecesConfiguration";

/*Forsyth-Edwards Notation - tzw FEN zapis szachowy dla określenia pozycji gry szachowej. 
Celem FEN jest podanie wszystkich niezbędnych informacji do ponownego rozpoczęcia gry od danej pozycji. 
Zapis FEN definiuje daną pozycję gry, a wszystko to jedną linią tekstu i używając tylko znaków ASCII. 
Zapis FEN ma 6 pól, każde pole jest oddzielone od innych spacją. Polami są:
 1. Pozycja bierek (z perspektywy białych). Każda linia jest opisana, zaczynając od ósmej i kończąc na pierwszej; w każdej linii opisuje się od a do h. 
    Tak jak w standardowej notacji algebraicznej każda bierka jest nazwana angielskim skrótem (pion-„P”, skoczek-„N”, goniec-„B”, wieża-„R”, hetman-„Q” oraz król-„K”).
    Białe bierki są pokazane wielkimi literami, podczas gdy czarne małymi (np. biały hetman to „Q”, a czarny to „q”). 
    Puste pola są notowane używając cyfr od 1 do 8 (liczba pustych pól)a „/” jest używane by pokazać koniec jednej linii.
 2. Czyj jest ruch. „w” (ang: white) znaczy, że ruch mają białe, „b” (ang. black) oznacza, że czarne.
 3. Możliwość roszady. Jeżeli żadna ze stron nie może roszować notuje się „-”. 
    Jeśli może to notuje się „K” jeżeli jest możliwość roszady od strony króla, albo „Q” jeżeli od strony hetmana. Możliwość czarnych notuje się małymi literami, czyli „k” i „q”
 4. Możliwość bicia w przelocie na polu docelowym. Jeżeli nie ma możliwości bicia w przelocie notuje się „-”. 
    Jeżeli jest możliwość notuje się pozycje „za” poruszonym pionem (czyli pozycję docelową gdyby było bicie w przelocie).
 5. Liczba połówek ruchów. Tutaj się notuje liczbę poruszeń (jeden ruch to dwa poruszenia figur) od ostatniego bicia albo poruszenia piona.
 6. Liczba pełnych ruchów, czyli pełny cykl, poruszenie figury białych oraz poruszenia figury czarnych tworzy jeden ruch.*/



export default class FenConfiguration extends PiecesConfiguration {

    constructor(whitePieces, blackPieces) {
        super(whitePieces, blackPieces);
    }

}