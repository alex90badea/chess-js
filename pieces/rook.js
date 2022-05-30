import Piece from './piece.js';
import {$} from "../helpers.js";

class Rook extends Piece {
    constructor(color, position) {
        super(position);
        this.color = color;
        this.html_char = color === 'BLACK' ? '&#9820;' : '&#9814;';
    }

    calculateAvailableMoves = (game) => {
        this.availableMoves = [];
        this.canMoveHL(8);
        this.canMoveHR(8);
        this.canMoveVU(8);
        this.canMoveVD(8);
    }

}

export default Rook;