import Piece from './piece.js';

class Bishop extends Piece{
    constructor(color, position) {
       super(position);
        this.color = color;
        this.html_char = color === 'BLACK' ? '&#9821;' : '&#9815;';
    }

    calculateAvailableMoves = () => {
        this.availableMoves = [];
        this.canMoveTR(8);
        this.canMoveTL(8);
        this.canMoveBR(8);
        this.canMoveBL(8);
    }

}

export default Bishop;