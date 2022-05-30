import Piece from './piece.js';

class King extends Piece{
    constructor(color, position) {
       super(position);
        this.color = color;
        this.html_char = color === 'BLACK' ? '&#9818;' : '&#9812;';
    }

    calculateAvailableMoves = () => {
        this.availableMoves = [];
        this.canMoveHL(1);
        this.canMoveHR(1);
        this.canMoveVU(1);
        this.canMoveVD(1);
        this.canMoveTR(1);
        this.canMoveTL(1);
        this.canMoveBR(1);
        this.canMoveBL(1);
    }

}

export default King;