import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../../models/game-piece';
import { Square } from '../../models/gameBoard';
import { Point } from '../../models/point';
import { Position } from '../../models/position';
import { PieceActions } from '../../actionHandlers/pieceActions.actions';
import { GameBoardActions } from '../../actionHandlers/gameBoardActions.actions';
import { PointActions } from '../../actionHandlers/pointActions.actions';
import { AppStateActions } from '../../actionHandlers/appState.actions';
import { Helper } from '../../helpers/helper';



@Component({
    selector: 'app-game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
    pieces: Array<Piece>;
    piece: Piece;
    point: Point;
    squares: Array<Square>;
    points: Array<Point>;
    scoreRed: Array<number> = [];
    scoreBlack: Array<number> = [];

    public selectedPiece: number;
    public isMoving = false;
    public originalPosition: Position;
    public currentlyPlayingColor = 'red';
    public skippedPosition: Position;
    public availablePositionOne: Position;
    public availablePositionTwo: Position;
    public pieceSelected: any;
    public isKing = false;
    private piecesSubscription: any;
    private pointsSubscription: any;
    private squaresSubscription: any;
    private appStateSubscription: any;


    constructor(
        private _store: Store<any>,
        private _pieceActions: PieceActions,
        private _squareActions: GameBoardActions,
        private _pointActions: PointActions,
        private _appStateActions: AppStateActions,
        private _helper: Helper
    ) { }

    public ngOnInit() {
        this._store.select('pieces').subscribe((pieces) => this.pieces = pieces);
        this._store.select('squares').subscribe((squares) => this.squares = squares);
        this._store.select('points').subscribe((points) => this.points = points);

        this.appStateSubscription = this._store.select('appState').subscribe((appState) => {
            this.isMoving = appState[`player.isMoving`];
        });

    }

    public ngOnDestroy() {
        this.appStateSubscription.unsubscribe();
    }

    public pieceSelectedisCurrentPlayer(): boolean {
        if (this.pieceSelected.color === this.currentlyPlayingColor) {
            return true;
        }
        return false;
    }

    public findPiece(row: number, col: number): Piece | undefined {
        return this.pieces.find((piece) => {
            if (piece.row === row && piece.col === col) {
                return true;
            } else {
                return false;
            }
        });
    }

    public findSquare(row: number, col: number): Square | undefined {
        return this.squares.find((square) => (square.row === row && square.col === col));
    }

    public switchTurn() {
        this.currentlyPlayingColor = this.currentlyPlayingColor === 'red' ? 'black' : 'red';
    }

    public moveStarted(row: number, column: number): void {
        this.originalPosition = { row, column };
        this.pieceSelected = this._helper.findSelectedPiece(this.originalPosition.row, this.originalPosition.column, this.pieces);
        if (this.pieceSelectedisCurrentPlayer()) {
            if (!this.pieceSelected.isKing) {
                this._squareActions.availableMoves(this.originalPosition, this.pieceSelected);
            }
            this._appStateActions.updateState({ 'player.isMoving': true });
        }
    }

    public moveInProgress(originalPosition: Position, row: number, column: number) {
        if (this.pieceSelectedisCurrentPlayer()) {
            if (this.isAJump(originalPosition, { row, column })) {
                this._pieceActions.jump(originalPosition, { row, column }, this.skippedPosition);
                this.addingPoints();
            } else if (this.isValidMove(originalPosition, { row, column })) {
                this._pieceActions.move(originalPosition, { row, column });
            }
            this.switchTurn();
            this._squareActions.unhighlightSquares();
        }
    }

    public moveComplete() {
        this._appStateActions.updateState({ 'player.isMoving': false });
    }


    public addingPoints(): void {
        this._pointActions.addPoint(this.pieceSelected.color);
        if (this.pieceSelected.color === 'red') {
            this.scoreRed = Array(this.points[0].count).fill('1');
        } else if (this.pieceSelected.color === 'black') {
            this.scoreBlack = Array(this.points[1].count).fill('2');
        }
    }

    public moveSelected(row: number, column: number): void {
        if (!this.isMoving) {
            this.moveStarted(row, column);
        } else {
            this.moveInProgress(this.originalPosition, row, column);
            this.moveComplete();
        }
    }

    public isAJump(from: Position, to: Position): boolean {
        this.pieceSelected = this._helper.findSelectedPiece(from.row, from.column, this.pieces);
        if (this.pieceSelected.color === 'red') {
            if (!this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = {
                            row: from.row + 1,
                            column: from.column + 1
                        };
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = {
                            row: from.row + 1,
                            column: from.column - 1
                        };
                        return true;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = {
                            row: from.row - 1,
                            column: from.column + 1
                        };
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = {
                            row: from.row - 1,
                            column: from.column - 1
                        };
                        return true;
                    }

                }
            } else if (this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = {
                            row: from.row + 1,
                            column: from.column + 1
                        };
                        return true;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = {
                            row: from.row + 1,
                            column: from.column - 1
                        };
                        return true;

                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = {
                            row: from.row - 1,
                            column: from.column + 1
                        };
                        return true;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = {
                            row: from.row - 1,
                            column: from.column - 1
                        };
                        return true;

                    }

                }
            }

        } else if (this.pieceSelected.color === 'black') {
            if (!this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = {
                            row: from.row + 1,
                            column: from.column + 1
                        };
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = {
                            row: from.row + 1,
                            column: from.column - 1
                        };
                        return true;
                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = {
                            row: from.row - 1,
                            column: from.column + 1
                        };
                        return true;
                    }
                    if (from.column === to.column + 2) {
                        this.skippedPosition = {
                            row: from.row - 1,
                            column: from.column - 1
                        };
                        return true;
                    }

                }
            } else if (this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = {
                            row: from.row + 1,
                            column: from.column + 1
                        };
                        return true;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = {
                            row: from.row + 1,
                            column: from.column - 1
                        };
                        return true;

                    }
                } else if (to.row < from.row) {
                    if (from.column === to.column - 2) {
                        this.skippedPosition = {
                            row: from.row - 1,
                            column: from.column + 1
                        };
                        return true;

                    } else if (from.column === to.column + 2) {
                        this.skippedPosition = {
                            row: from.row - 1,
                            column: from.column - 1
                        };
                        return true;

                    }

                }
            }
        }
        return false;

    }

    

    public isValidMove(from: Position, to: Position): boolean {
        //if (this._helper.findEmptySpace(to.row, to.column, this.pieces)) {
        //    return false 
        //}
        const checkIfSpaceEmpty = this._helper.findEmptySpace(to.row, to.column, this.pieces);
        this.pieceSelected = this._helper.findSelectedPiece(from.row, from.column, this.pieces);
        if (!this.pieceSelected.isKing) {
            if (this._helper.checkIfPieceSelectedCanBeKing(this.pieceSelected, to.row)) {
                this._pieceActions.makeKing(this.pieceSelected);
            }
        }
        if (!checkIfSpaceEmpty) {
            return false;
        }
        if (this.pieceSelected.color === 'red') {
            if (!this.pieceSelected.isKing) {
                if (to.row > from.row) {
                    if (from.column === to.column - 1 || from.column === to.column + 1) {
                        return true;
                    }
                }
            } else if (this.pieceSelected.isKing) {
                if (to.row > from.row || to.row < from.row) {
                    if (from.column === to.column - 1 || from.column === to.column + 1) {
                        return true;
                    }
                }
            }
        } else if (this.pieceSelected.color === 'black') {
            if (!this.pieceSelected.isKing) {
                if (to.row < from.row) {
                    if (from.column === to.column - 1 || from.column === to.column + 1) {
                        return true;
                    }
                }

            } else if (this.pieceSelected.isKing) {
                if (to.row < from.row || to.row > from.row) {
                    if (from.column === to.column - 1 || from.column === to.column + 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
