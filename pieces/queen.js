import Piece from './piece.js';

class Queen extends Piece{
    constructor(color, position) {
       super(position);
        this.color = color;
        this.html_char = color === 'BLACK' ? '&#9819;' : '&#9813;';
    }

    calculateAvailableMoves = () => {
        this.availableMoves = [];
        this.canMoveHL(8);
        this.canMoveHR(8);
        this.canMoveVU(8);
        this.canMoveVD(8);
        this.canMoveTR(8);
        this.canMoveTL(8);
        this.canMoveBR(8);
        this.canMoveBL(8);
    }

}

export default Queen;