import Piece from './piece.js';

class Pawn extends Piece {
    constructor(color, position) {
        super(position);
        this.color = color;
        this.html_char = color === 'BLACK' ? '&#9823;' : '&#9817;';
    }

    calculateAvailableMoves = () => {

        this.availableMoves = [];

        if (this.color === 'WHITE') {
            this.canMoveVU(this.row === 2 ? 2 : 1);

            // can attack top - right
            let cellId = String.fromCharCode(this.column.charCodeAt(0) + 1) + (this.row + 1).toString();
            let currentPiece = game.getPieceByPosition(cellId);
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
            }

            // can attack top - left
            cellId = String.fromCharCode(this.column.charCodeAt(0) - 1) + (this.row + 1).toString();
            currentPiece = game.getPieceByPosition(cellId);
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
            }


        }

        if (this.color === 'BLACK') {
            this.canMoveVD(this.row === 7 ? 2 : 1);

            // can attack bottom - right
            let cellId = String.fromCharCode(this.column.charCodeAt(0) + 1) + (this.row - 1).toString();
            let currentPiece = game.getPieceByPosition(cellId);
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
            }

            // can attack bottom - left
            cellId = String.fromCharCode(this.column.charCodeAt(0) - 1) + (this.row - 1).toString();
            currentPiece = game.getPieceByPosition(cellId);
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
            }

        }
    }

}

export default Pawn;