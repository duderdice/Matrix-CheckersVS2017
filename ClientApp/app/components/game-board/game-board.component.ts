import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Piece } from '../../models/game-piece';
import { Square } from '../../models/square';
import { Position } from '../../models/position';
import { PieceStateActions } from '../../actionHandlers/pieceState.actions';
import { SquareStateActions } from '../../actionHandlers/squareState.actions';



@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  pieces: Array<Piece>;
  piece: Piece;
  squares: Array<Square>;

  public selectedPiece: number;
  public isMoving = false;
  public originalPosition: Position;
  public currentPlayer = 'red';
  public skippedPosition: Position;
  public availablePositionOne: Position;
  public availablePositionTwo: Position;

    public pieceSelected: any;


  public isKing = false;


  constructor(
    private _store: Store<any>,
    private _pieceState: PieceStateActions,
    private _squareState: SquareStateActions
  ) { }

  ngOnInit() {
    this._store.select('pieces').subscribe((pieces) => this.pieces = pieces);
    this._store.select('squares').subscribe((squares) => this.squares = squares);
  }

  public findPiece(row: number, col: number) {
    return this.pieces.find((piece) => {
      if (piece.row === row && piece.col === col) {
        return true;
      } else {
        return false;
      }
    });
  }

    public findSquare(row: number, col: number) {
    return this.squares.find((square) => (square.row === row && square.col === col));
  }

    public findSelectedPiece(row: number, col: number) {
    for (let i = 0; i < this.pieces.length; i++) {
        if (this.pieces[i].row === row && this.pieces[i].col === col) {
            const requiredPiece = this.pieces[i];
            return requiredPiece;
        }
      
    }
        return false;
  }

    public findEmptySpace(row: number, col: number) {
    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].row !== row && this.pieces[i].col !== col) {
        return true;
      }
    }
  }

  public findIfKing(piece: Piece, row: number) {
    if (piece.color === 'red' && row === 7) {
      this._pieceState.makeKing(piece);
      return true;
    } else if (piece.color === 'black' && row === 0) {
      this._pieceState.makeKing(piece);
      return true;
    }
      return false;
  }

  public availableMoves(position: Position) {
    this.pieceSelected = this.findSelectedPiece(position.row, position.col);
    if (this.pieceSelected.color === 'red') {
      this.availablePositionOne = {
        row: position.row + 1,
        col: position.col + 1
      };
      this.availablePositionTwo = {
        row: position.row + 1,
        col: position.col - 1
      };
      this._squareState.availableMoves(this.availablePositionOne, this.availablePositionTwo);
    } else {
      if (this.pieceSelected.color === 'black') {
        this.availablePositionOne = {
          row: position.row - 1,
          col: position.col + 1
        };
        this.availablePositionTwo = {
          row: position.row - 1,
          col: position.col - 1
        };
        this._squareState.availableMoves(this.availablePositionOne, this.availablePositionTwo);
      }
    }
  }

    public moveSelected(row: number, col: number) {
    if (!this.isMoving) {
      this.originalPosition = { row, col };
      this.pieceSelected = this.findSelectedPiece(this.originalPosition.row, this.originalPosition.col);
      if (!this.pieceSelected.isKing) {
        this.availableMoves(this.originalPosition);
      }
      this.isMoving = true;
    } else {
      if (this.pieceSelected.color === this.currentPlayer) {
        if (this.isAJump(this.originalPosition, { row, col })) {
          this._pieceState.jump(this.originalPosition, { row, col }, this.skippedPosition);
          this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        } else if (this.isValidMove(this.originalPosition, { row, col })) {
          this._pieceState.move(this.originalPosition, { row, col });
          this.currentPlayer = this.currentPlayer === 'red' ? 'black' : 'red';
        }
        this._squareState.unhighlightSquares();
        this.isMoving = false;
      } else {
        this.isMoving = false;
      }

      // this.currentPlayer = this.currentPlayer === 'Player Red' ? 'Player Black' : 'Player Red';
    }
  }



  public isAJump(from: Position, to: Position) {
    this.pieceSelected = this.findSelectedPiece(from.row, from.col);
    if (this.pieceSelected.color === 'red') {
      if (to.row > from.row) {
        if (from.col === to.col - 2) {
          this.skippedPosition = {
            row: from.row + 1,
            col: from.col + 1
          };
          return true;
        }
        if (from.col === to.col + 2) {
          this.skippedPosition = {
            row: from.row + 1,
            col: from.col - 1
          };
          return true;
        }
      }
    } else if (this.pieceSelected.color === 'black') {
      if (to.row < from.row) {
        if (from.col === to.col - 2) {
          this.skippedPosition = {
            row: from.row - 1,
            col: from.col + 1
          };
          return true;
        }
        if (from.col === to.col + 2) {
          this.skippedPosition = {
            row: from.row - 1,
            col: from.col - 1
          };
          return true;
        }
      }
    }
    return false;

  }

  public isValidMove(from: Position, to: Position) {
    const checkIfSpaceEmpty = this.findEmptySpace(to.row, to.col);
    this.pieceSelected = this.findSelectedPiece(from.row, from.col);
    if (this.pieceSelected.isKing === false) {
      this.isKing = this.findIfKing(this.pieceSelected, from.row);
    }
    if (!checkIfSpaceEmpty) {
      return false;
    }
    if (this.pieceSelected.color === 'red') {
      if (!this.isKing) {
        if (to.row > from.row) {
          if (from.col === to.col - 1 || from.col === to.col + 1) {
            return true;
          }
        }
      } else if (this.isKing) {
        if (to.row > from.row || to.row < from.row) {
          if (from.col === to.col - 1 || from.col === to.col + 1) {
            return true;
          }
        }
      }
    } else if (this.pieceSelected.color === 'black') {
      if (!this.isKing) {
        if (to.row < from.row) {
          if (from.col === to.col - 1 || from.col === to.col + 1) {
            return true;
          }
        }
      } else if (this.isKing) {
        if (to.row < from.row || to.row > from.row) {
          if (from.col === to.col - 1 || from.col === to.col + 1) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
