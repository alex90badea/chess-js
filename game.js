import {$, $$} from "./helpers.js";
import Rook from "./pieces/rook.js";
import Horse from "./pieces/horse.js";
import Bishop from "./pieces/bishop.js";
import King from "./pieces/king.js";
import Queen from "./pieces/queen.js";
import Pawn from "./pieces/pawn.js";

const WHITE = 'WHITE';
const BLACK = 'BLACK';

const initialState = [
    new Rook(BLACK, "a8"),
    new Horse(BLACK, "b8"),
    new Bishop(BLACK, "c8"),
    new Queen(BLACK, "d8"),
    new King(BLACK, "e8"),
    new Bishop(BLACK, "f8"),
    new Horse(BLACK, "g8"),
    new Rook(BLACK, "h8"),
    new Pawn(BLACK, "a7"),
    new Pawn(BLACK, "b7"),
    new Pawn(BLACK, "c7"),
    new Pawn(BLACK, "d7"),
    new Pawn(BLACK, "e7"),
    new Pawn(BLACK, "f7"),
    new Pawn(BLACK, "g7"),
    new Pawn(BLACK, "h7"),

    new Rook(WHITE, "a1"),
    new Pawn(WHITE, "b1"),
    new Bishop(WHITE, "c1"),
    new Queen(WHITE, "d1"),
    new King(WHITE, "e1"),
    new Bishop(WHITE, "f1"),
    new Horse(WHITE, "g1"),
    new Rook(WHITE, "h1"),
    new Pawn(WHITE, "a2"),
    new Pawn(WHITE, "b2"),
    new Pawn(WHITE, "c2"),
    new Pawn(WHITE, "d2"),
    new Pawn(WHITE, "e2"),
    new Pawn(WHITE, "f2"),
    new Pawn(WHITE, "g2"),
    new Pawn(WHITE, "h2"),
];


class Game {

    startGame = () => {
        this.turn = WHITE;
        this.state = initialState;
        this.draw(this);
    }

    getPieceByPosition = (position) => this.state.find(i => i.position === position)

    changeTurn = () => {
        this.turn = this.turn === WHITE ? BLACK : WHITE;
        this.cleanup();
        this.draw();
        this.checkForCheck();
    }

    /**
     * Main DRAW function
     */
    draw = () => {

        this.renderPieces();
        $$('.cell span.active').forEach(elem => elem.removeEventListener('click', this.onPieceClick));

        // set active player indicator
        $$('.cell span').forEach(elem => elem.classList.remove('active'));
        if (this.turn === WHITE) {
            $('.current-player').classList.add('bottom');
            // enable hover effect
            $$('span.white').forEach(elem => elem.classList.add('active'));
        } else {
            $('.current-player').classList.remove('bottom');
            // enable hover effect
            $$('span.black').forEach(elem => elem.classList.add('active'));
        }

        // register onclick event for current player to move
        $$('.cell span.active').forEach(elem => elem.addEventListener('click', this.onPieceClick));

    }

    /**
     * Draws each piece into its position
     */
    renderPieces = () => {
        $$('.cell span').forEach(span => span.remove());
        this.state.filter(i => i).forEach(piece => {
            piece.calculateAvailableMoves(this);
            const cell = document.getElementById(piece.position);
            cell.innerHTML = `<span class="${piece.color.toLowerCase()}">${piece.html_char}</span>`;
        });
    }

    /**
     * On click active player before move
     * @param e
     */
    onPieceClick = (e) => {
        //get cell
        const cell = e.target.parentElement;
        const id = cell.getAttribute('id');
        // get piece object
        const currentPiece = this.getPieceByPosition(id);

        if (cell.classList.contains('clicked')) {
            this.cleanup();
            this.draw();
            return;
        }

        //cleanup
        this.cleanup();

        cell.classList.add('clicked');

        if (cell.classList.contains('clicked')) {
            currentPiece.showPossibleMoves(this);
            $$('.cell.highlight').forEach(elem => elem.addEventListener('click', this.onHighlightClick));
        }
    }

    onHighlightClick = (e) => {
        //get cell
        const destinationCellId = e.target.getAttribute('id');
        const clickedPieceId = $('.cell.clicked').getAttribute('id');
        // get piece object
        const currentPiece = this.getPieceByPosition(clickedPieceId);
        if (currentPiece.move(this, destinationCellId)) {
            this.changeTurn();
        }
    }

    cleanup = () => {
        $$('.cell.highlight').forEach(elem => elem.removeEventListener('click', this.onHighlightClick));
        $$('.cell.highlight').forEach(elem => elem.classList.remove('highlight'));
        $$('.cell.clicked').forEach(elem => elem.classList.remove('clicked'));
        $$('span.active').forEach(elem => elem.classList.remove('active'));
    }

    removePieceFromGame = (piece) => {
        this.state = this.state.filter(i => i.position !== piece.position);
    }

    checkForCheck = () => {
        const currentPlayerKing = this.state.find(piece => piece.color === this.turn && piece instanceof King);
        const isInCheck = this.state.filter(piece => piece.color !== this.turn).some(piece => piece.availableMoves.includes(currentPlayerKing.position));
        const checkMessage = $('.check-message');
        if (isInCheck) {

            if (checkMessage.classList.contains('active')) {
                checkMessage.classList.add('shake');
                setTimeout(() => checkMessage.classList.remove('shake'), 500);
            } else {
                checkMessage.classList.add('active');
            }
        } else {
            checkMessage.classList.remove('active');
        }
        return isInCheck;
    }

}

game = new Game();

window.onload = () => {
    game.startGame();
};