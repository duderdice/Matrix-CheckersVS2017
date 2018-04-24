using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;

// For more information on enabling MVC for empty projects, visit https=//go.microsoft.com/fwlink/?LinkID=397860

namespace DemoApp.Controllers
{
    [Route("api/[controller]")]
    public class PiecesController : Controller
    {
        [HttpGet]
        public IEnumerable<Piece> GetPieces()
        {

            Piece[] Pieces = new Piece[24] {
               new Piece()
               {
                    id= 0,
                    row= 0,
                    col= 1,
                    color= "red",
                    isKing= false
                },
               new Piece(){
                        id= 1,
                        row = 0,
                    col= 3,
                    color= "red",
                    isKing= false
                 },
              new Piece()  {
                        id= 2,
                    row= 0,
                    col= 5,
                    color= "red",
                    isKing= false
                 },
               new Piece(){
                        id= 3,
                    row= 0,
                    col= 7,
                    color= "red",
                    isKing= false
                 },
               new Piece() {
                        id= 4,
                    row= 1,
                    col= 0,
                    color= "red",
                    isKing= false
                 },
               new Piece() {
                        id= 5,
                    row= 1,
                    col= 2,
                    color= "red",
                    isKing= false
                 },
                new Piece() {
                        id= 6,
                    row= 1,
                    col= 4,
                    color= "red",
                    isKing= false
                 },
                 new Piece()
                   {
                        id= 7,
                    row= 1,
                    col= 6,
                    color= "red",
                    isKing= false
                 },
                 new Piece() {
                        id= 8,
                    row= 2,
                    col= 1,
                    color= "red",
                    isKing= false
                 },
                 new Piece() {
                        id= 9,
                    row= 2,
                    col= 3,
                    color= "red",
                    isKing= false
                 },
                 new Piece(){
                        id= 10,
                    row= 2,
                    col= 5,
                    color= "red",
                    isKing= false
                 },
                 new Piece(){
                        id= 11,
                    row= 2,
                    col= 7,
                    color= "red",
                    isKing= false
                 },
                 new Piece(){
                        id= 12,
                    row= 5,
                    col= 0,
                    color= "black",
                    isKing= false
                 },
                 new Piece(){
                        id= 13,
                    row= 5,
                    col= 2,
                    color= "black",
                    isKing= false
                 },
                 new Piece() {
                        id= 14,
                    row= 5,
                    col= 4,
                    color= "black",
                    isKing= false
                 },
                 new Piece() {
                        id= 15,
                    row= 5,
                    col= 6,
                    color= "black",
                    isKing= false
                 },
                 new Piece(){
                        id= 16,
                    row= 6,
                    col= 1,
                    color= "black",
                    isKing= false
                 },
                 new Piece()
                  {
                        id= 17,
                    row= 6,
                    col= 3,
                    color= "black",
                    isKing= false
                 },
                 new Piece() {
                        id= 18,
                    row= 6,
                    col= 5,
                    color= "black",
                    isKing= false
                 },
                 new Piece(){
                        id= 19,
                    row= 6,
                    col= 7,
                    color= "black",
                    isKing= false
                 },
                 new Piece(){
                        id= 20,
                    row= 7,
                    col= 0,
                    color= "black",
                    isKing= false
                 },
                 new Piece(){
                        id= 21,
                    row= 7,
                    col= 2,
                    color= "black",
                    isKing= false
                 },
                 new Piece(){
                        id= 22,
                    row= 7,
                    col= 4,
                    color= "black",
                    isKing= false
                 },
                 new Piece(){
                        id= 23,
                    row= 7,
                    col= 6,
                    color= "black",
                    isKing= false
                 }
            };
            Console.WriteLine("heyyy");
            Console.WriteLine(Pieces);
            return Pieces;
        }
    }
        
    
}
