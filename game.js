import {deepClone} from "./helpers.js";

const WHITE = 'WHITE';
const BLACK = 'BLACK';

const ROOK = 'ROOK'
const HORSE = 'HORSE'
const BISHOP = 'BISHOP'
const KING = 'KING'
const QUEEN = 'QUEEN'
const PAWN = 'PAWN'

const HTML_CHARS = {
    WHITE_ROOK: '&#9814;',
    WHITE_HORSE: '&#9816;',
    WHITE_BISHOP: '&#9815;',
    WHITE_KING: '&#9812;',
    WHITE_QUEEN: '&#9813;',
    WHITE_PAWN: '&#9817;',
    BLACK_ROOK: '&#9820;',
    BLACK_HORSE: '&#9822;',
    BLACK_BISHOP: '&#9821;',
    BLACK_KING: '&#9819;',
    BLACK_QUEEN: '&#9818;',
    BLACK_PAWN: '&#9823;',
};



const initialState = {
    "a8": {color: BLACK, type: ROOK},
    "b8": {color: BLACK, type: HORSE},
    "c8": {color: BLACK, type: BISHOP},
    "d8": {color: BLACK, type: KING},
    "e8": {color: BLACK, type: QUEEN},
    "f8": {color: BLACK, type: BISHOP},
    "g8": {color: BLACK, type: HORSE},
    "h8": {color: BLACK, type: ROOK},

    "a1": {color: WHITE, type: ROOK},
    "b1": {color: WHITE, type: HORSE},
    "c1": {color: WHITE, type: BISHOP},
    "d1": {color: WHITE, type: KING},
    "e1": {color: WHITE, type: QUEEN},
    "f1": {color: WHITE, type: BISHOP},
    "g1": {color: WHITE, type: HORSE},
    "h1": {color: WHITE, type: ROOK},
};


class Game {

    constructor() {

        //state properties
        this.turn = WHITE;
        this.state = deepClone(initialState);

        //game mechanics
        this.renderer = new GameRenderer();
    }

    changeTurn = () => {
        this.turn = this.turn === WHITE ? BLACK : WHITE;
    }

    startGame = () => {
        this.renderer.drawPieces(this.state);
    }


}

class GameRenderer {
    drawPieces = (state) => {
        Object.keys(state).forEach((spot => {
            const piece = state[spot];
            const cell = document.getElementById(spot);
            cell.innerHTML = `<span>${HTML_CHARS[piece.color + '_' + piece.type]}</span>`;
        }));
    }
}


window.onload = () => {
    const game = new Game();
    game.startGame();
};