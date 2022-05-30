import Piece from './piece.js';

class Horse extends Piece {
    constructor(color, position) {
        super(position);
        this.color = color;
        this.html_char = color === 'BLACK' ? '&#9822;' : '&#9816;';
    }

    _addMove = (row, column) => {

        const cellId = String.fromCharCode(column) + row;
        const currentPiece = game.getPieceByPosition(cellId);

        if (currentPiece && currentPiece.color === this.color) {
            return;
        }

        if (row >= 1 && row <= 8 && column >= 'a'.charCodeAt(0) && column <= 'h'.charCodeAt(0))
            this.availableMoves.push(`${String.fromCharCode(column)}${row}`);
    }

    calculateAvailableMoves = () => {
        this.availableMoves = [];

        let row, column;


        row = this.row + 2;
        column = this.column.charCodeAt(0) - 1;
        this._addMove(row, column);

        row = this.row - 2;
        column = this.column.charCodeAt(0) - 1;
        this._addMove(row, column);

        row = this.row + 2;
        column = this.column.charCodeAt(0) + 1;
        this._addMove(row, column);

        row = this.row - 2;
        column = this.column.charCodeAt(0) + 1;
        this._addMove(row, column);

        row = this.row + 1;
        column = this.column.charCodeAt(0) - 2;
        this._addMove(row, column);

        row = this.row - 1;
        column = this.column.charCodeAt(0) + 2;
        this._addMove(row, column);

        row = this.row + 1;
        column = this.column.charCodeAt(0) + 2;
        this._addMove(row, column);

        row = this.row - 1;
        column = this.column.charCodeAt(0) - 2;
        this._addMove(row, column);
    }

}

export default Horse;