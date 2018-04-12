import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../../models/game-piece';
import { Store } from '@ngrx/store';
import { Square } from '../../models/square';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input()
  square: Square;

  @Input()
  piece: Piece;


  constructor(
    private _store: Store<any>,
  ) { }

  ngOnInit() {
    /*
    this._store.select('squares').subscribe((squares) => {
      this.square = squares.find((square) => {
        if (this.piece) {
          return (square.row === this.piece.row && square.col === this.piece.col);
        }
      });
    });
    */
    // const a = this.squares.find((square) => square.validMove === true);
    // console.log(a);

  }

}
