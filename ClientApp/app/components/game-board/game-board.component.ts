import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../../models/game-piece';
import { Square } from '../../models/square';
import { Point } from '../../models/point';
import { Position } from '../../models/position';
import { PieceActions } from '../../actionHandlers/pieceActions.actions';
import { GameBoardActions } from '../../actionHandlers/gameBoardActions.actions';
import { PointActions } from '../../actionHandlers/pointActions.actions';
import { AppStateActions } from '../../actionHandlers/appState.actions';



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
    public currentPlayer = 'red';
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
        private _appStateActions: AppStateActions
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

    public findSelectedPiece(row: number, col: number): Piece | false {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].row === row && this.pieces[i].col === col) {
                const requiredPiece = this.pieces[i];
                return requiredPiece;
            }

        }
        return false;
    }

    public findEmptySpace(row: number, col: number): boolean | undefined {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].row !== row && this.pieces[i].col !== col) {
                return true;
            }
        }
    }

    public findIfKing(piece: Piece, row: number): boolean {
        if (piece.color === 'red' && row === 7) {
            this._pieceActions.makeKing(piece);
            return true;
        } else if (piece.color === 'black' && row === 0) {
            this._pieceActions.makeKing(piece);
            return true;
        }
        return false;
    }

    public addingPoints(): void {
        if (this.pieceSelected.color === 'red') {
            this.scoreRed = Array(this.points[0].count).fill('1');
        } else if (this.pieceSelected.color === 'black') {
            this.scoreBlack = Array(this.points[1].count).fill('2');
        }
    }

    public moveSelected(row: number, column: number): void {
        if (!this.isMoving) {
            this.originalPosition = { row, column };
            this.pieceSelected = this.findSelectedPiece(this.originalPosition.row, this.originalPosition.column);
            if (this.pieceSelected.color === this.currentPlayer) {
                if (!this.pieceSelected.isKing) {
                    this._squareActions.availableMoves(this.originalPosition, this.pieceSelected);
                }
                this._appStateActions.updateState({ 'player.isMoving': true });
            }
        } else {
            if (this.pieceSelected.color === this.currentPlayer) {
                if (this.isAJump(this.originalPosition, { row, column })) {
                    this._pieceActions.jump(this.originalPosition, { row, column }, this.skippedPosition);
                    this._pointActions.addPoint(this.pieceSelected.color);
                    this.addingPoints();
                    this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
                } else if (this.isValidMove(this.originalPosition, { row, column })) {
                    this._pieceActions.move(this.originalPosition, { row, column });
                    this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
                }
                this._squareActions.unhighlightSquares();
                this._appStateActions.updateState({ 'player.isMoving': false });
            } else {
                this._appStateActions.updateState({ 'player.isMoving': false });
            }
        }
    }



    public isAJump(from: Position, to: Position): boolean {
        this.pieceSelected = this.findSelectedPiece(from.row, from.column);
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
        const checkIfSpaceEmpty = this.findEmptySpace(to.row, to.column);
        this.pieceSelected = this.findSelectedPiece(from.row, from.column);
        if (this.pieceSelected.isKing === false) {
            this.isKing = this.findIfKing(this.pieceSelected, to.row);
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
