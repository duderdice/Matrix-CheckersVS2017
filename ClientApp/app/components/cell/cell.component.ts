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
  
  }

}
