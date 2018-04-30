﻿import { Piece } from '../models/game-piece';

   export class Helper
   {
       public findSelectedPiece(row: number, col: number, pieces: Array<Piece>): Piece | false {
           for (let i = 0; i < pieces.length; i++) {
               if (pieces[i].row === row && pieces[i].col === col) {
                   const requiredPiece = pieces[i];
                   return requiredPiece;
               }

           }
           return false;
       }


    }

