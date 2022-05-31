import {$, getColumn, getRow} from "../helpers.js";

class Piece {

    constructor(position) {
        this.setPosition(position);
        this.availableMoves = [];
    }

    setPosition = (position) => {
        this.position = position;
        this.row = parseInt(getRow(position));
        this.column = getColumn(position);
    }

    move = (game, destinationCellId) => {

        //check is enemy piece
        const destinationPiece = game.getPieceByPosition(destinationCellId);

        if (destinationPiece && destinationPiece.color !== this.color) {
            game.removePieceFromGame(destinationPiece);
        }

        const prevPosition = this.position;
        this.setPosition(destinationCellId);

        game.renderPieces();
        if (game.checkForCheck(true) === true) {
            this.setPosition(prevPosition);
            game.draw();
            return false;
        }

        return true;

    }

    showPossibleMoves = () => {
        this.availableMoves.forEach(cellId => {
            const currentCell = $(`#${cellId}`);
            currentCell.classList.add('highlight');
        })
    }

    canMoveVD = (steps) => {
        // vertical - down
        for (let rowNumber = this.row - 1; rowNumber >= Math.max(this.row - steps, 1); rowNumber--) {

            const cellId = this.column + rowNumber.toString();
            const currentPiece = game.getPieceByPosition(cellId);

            if (currentPiece && currentPiece.color === this.color) {
                break;
            }
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
                break;
            }
            this.availableMoves.push(cellId);
        }
    }

    canMoveVU = (steps) => {
        // vertical - up
        for (let rowNumber = this.row + 1; rowNumber <= Math.min(this.row + steps, 8); rowNumber++) {

            const cellId = this.column + rowNumber.toString();
            const currentPiece = game.getPieceByPosition(cellId);

            if (currentPiece && currentPiece.color === this.color) {
                break;
            }
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
                break;
            }
            this.availableMoves.push(cellId);
        }
    }

    canMoveHL = (steps) => {
        // horizontal - left
        for (let i = this.column.charCodeAt(0) - 1; i >= Math.max(this.column.charCodeAt(0) - steps, 'a'.charCodeAt(0)); i--) {

            const cellId = String.fromCharCode(i) + this.row;
            const currentPiece = game.getPieceByPosition(cellId);

            if (currentPiece && currentPiece.color === this.color) {
                break;
            }
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
                break;
            }
            this.availableMoves.push(cellId);
        }
    }

    canMoveHR = (steps) => {
        // horizontal - left
        for (let i = this.column.charCodeAt(0) + 1; i <= Math.min(this.column.charCodeAt(0) + steps, 'h'.charCodeAt(0)); i++) {

            const cellId = String.fromCharCode(i) + this.row;
            const currentPiece = game.getPieceByPosition(cellId);

            if (currentPiece && currentPiece.color === this.color) {
                break;
            }
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
                break;
            }
            this.availableMoves.push(cellId);
        }
    }

    canMoveTR = (steps) => {
        // top - right - diagonal
        const currentColumn = this.column.charCodeAt(0);
        let moves = 0;
        for (let i = currentColumn + 1, j = this.row + 1; i <= Math.min(currentColumn + steps, 'h'.charCodeAt(0)), j <= 8; i++, j++) {
            if (moves >= steps) break;
            if (i > 'h'.charCodeAt(0)) break;

            const cellId = String.fromCharCode(i) + j;
            const currentPiece = game.getPieceByPosition(cellId);

            if (currentPiece && currentPiece.color === this.color) {
                break;
            }
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
                moves++;
                break;
            }
            this.availableMoves.push(cellId);
            moves++;
        }
    }

    canMoveBR = (steps) => {
        // bottom - right - diagonal
        const currentColumn = this.column.charCodeAt(0);
        let moves = 0;
        for (let i = currentColumn + 1, j = this.row - 1; i <= Math.min(currentColumn + steps, 'h'.charCodeAt(0)), j > 0; i++, j--) {
            if (moves >= steps) break;
            if (i > 'h'.charCodeAt(0)) break;

            const cellId = String.fromCharCode(i) + j;
            const currentPiece = game.getPieceByPosition(cellId);

            if (currentPiece && currentPiece.color === this.color) {
                break;
            }
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
                moves++;
                break;
            }
            this.availableMoves.push(cellId);
            moves++;
        }
    }

    canMoveTL = (steps) => {
        // top - left - diagonal
        const currentColumn = this.column.charCodeAt(0);
        let moves = 0;
        for (let i = currentColumn - 1, j = this.row + 1; i <= Math.min(currentColumn + steps, 'a'.charCodeAt(0)), j <= 8; i--, j++) {
            if (moves >= steps) break;
            if (i < 'a'.charCodeAt(0)) break;

            const cellId = String.fromCharCode(i) + j;
            const currentPiece = game.getPieceByPosition(cellId);
            if (currentPiece && currentPiece.color === this.color) {
                break;
            }
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
                moves++;
                break;
            }
            this.availableMoves.push(cellId);
            moves++;

        }
    }

    canMoveBL = (steps) => {
        // bottom - left - diagonal
        const currentColumn = this.column.charCodeAt(0);
        let moves = 0;
        for (let i = currentColumn - 1, j = this.row - 1; i <= Math.min(currentColumn + steps, 'a'.charCodeAt(0)), j > 0; i--, j--) {
            if (moves >= steps) break;
            if (i < 'a'.charCodeAt(0)) break;

            const cellId = String.fromCharCode(i) + j;
            const currentPiece = game.getPieceByPosition(cellId);
            if (currentPiece && currentPiece.color === this.color) {
                break;
            }
            if (currentPiece && currentPiece.color !== this.color) {
                this.availableMoves.push(cellId);
                moves++;
                break;
            }
            this.availableMoves.push(cellId);
            moves++;

        }
    }
}

export default Piece;