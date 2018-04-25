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
    public class SquaresController : Controller
    {
        Square[] Squares = new Square[] {
                new Square()
                {
                    id= 0,
                    row= 0,
                    col= 0,
                    validMove= false
                },
                new Square()
                {
                    id= 1,
                    row= 0,
                    col= 1,
                    validMove= false
                 },
                new Square()
                {
                    id= 2,
                    row= 0,
                    col= 2,
                    validMove= false
                },
                new Square()
                {
                    id= 3,
                    row= 0,
                    col= 3,
                    validMove= false
                },
                new Square()
                {
                    id= 4,
                    row= 0,
                    col= 4,
                    validMove= false
                },
                new Square()
                {
                    id= 5,
                    row= 0,
                    col= 5,
                    validMove= false
                },
                new Square()
                {
                    id= 6,
                    row= 0,
                    col= 6,
                    validMove= false
                },
                 new Square()
                 {
                    id= 7,
                    row= 0,
                    col= 7,
                    validMove= false
                 }, new Square()
                         {
                    id= 8,
                    row= 1,
                    col= 0,
                    validMove= false
                 },
                new Square() {
            id= 9,
            row= 1,
            col= 1,
            validMove= false
        },
                 new Square(){
            id= 10,
            row= 1,
            col= 2,
            validMove= false
        },
                  new Square(){
            id= 11,
            row= 1,
            col= 3,
            validMove= false
        },
                   new Square(){
            id= 12,
            row= 1,
            col= 4,
            validMove= false
        },
                    new Square(){
            id= 13,
            row= 1,
            col= 5,
            validMove= false
        },
                     new Square(){
            id= 14,
            row= 1,
            col= 6,
            validMove= false
        },
                      new Square(){
            id= 15,
            row= 1,
            col= 7,
            validMove= false
        },
                       new Square(){
            id= 16,
            row= 2,
            col= 0,
            validMove= false
        },
                        new Square(){
            id= 17,
            row= 2,
            col= 1,
            validMove= false
        },
                         new Square(){
            id= 18,
            row= 2,
            col= 2,
            validMove= false
        },
                          new Square(){
            id= 19,
            row= 2,
            col= 3,
            validMove= false
        },
                           new Square(){
            id= 20,
            row= 2,
            col= 4,
            validMove= false
        },
 new Square(){
            id= 21,
            row= 2,
            col= 5,
            validMove= false
        },
  new Square(){
            id= 22,
            row= 2,
            col= 6,
            validMove= false
        },
   new Square(){
            id= 23,
            row= 2,
            col= 7,
            validMove= false
        },
    new Square(){
            id= 24,
            row= 3,
            col= 0,
            validMove= false
        },
     new Square(){
            id= 25,
            row= 3,
            col= 1,
            validMove= false
        },
      new Square(){
            id= 26,
            row= 3,
            col= 2,
            validMove= false
        },
       new Square(){
            id= 27,
            row= 3,
            col= 3,
            validMove= false
        },
        new Square(){
            id= 28,
            row= 3,
            col= 4,
            validMove= false
        },
         new Square(){
            id= 29,
            row= 3,
            col= 5,
            validMove= false
        },
          new Square(){
            id= 30,
            row= 3,
            col= 6,
            validMove= false
        },
           new Square(){
            id= 31,
            row= 3,
            col= 7,
            validMove= false
        },
            new Square(){
            id= 32,
            row= 4,
            col= 0,
            validMove= false
        },
             new Square(){
            id= 33,
            row= 4,
            col= 1,
            validMove= false
        },
              new Square(){
            id= 34,
            row= 4,
            col= 2,
            validMove= false
        },
               new Square(){
            id= 35,
            row= 4,
            col= 3,
            validMove= false
        },
                new Square(){
            id= 36,
            row= 4,
            col= 4,
            validMove= false
        },
                 new Square(){
            id= 37,
            row= 4,
            col= 5,
            validMove= false
        },
                  new Square(){
            id= 38,
            row= 4,
            col= 6,
            validMove= false
        },
                new Square()
        {
            id= 39,
            row= 4,
            col= 7,
            validMove= false
        },
                 new Square(){
            id= 40,
            row= 5,
            col= 0,
            validMove= false
        },
                  new Square(){
            id= 41,
            row= 5,
            col= 1,
            validMove= false
        },
                   new Square(){
            id= 42,
            row= 5,
            col= 2,
            validMove= false
        },
                    new Square(){
            id= 43,
            row= 5,
            col= 3,
            validMove= false
        },
                     new Square(){
            id= 44,
            row= 5,
            col= 4,
            validMove= false
        },
                      new Square(){
            id= 45,
            row= 5,
            col= 5,
            validMove= false
        },
                       new Square(){
            id= 46,
            row= 5,
            col= 6,
            validMove= false
        },
                        new Square(){
            id= 47,
            row= 5,
            col= 7,
            validMove= false
        },
                         new Square(){
            id= 48,
            row= 6,
            col= 0,
            validMove= false
        },
                          new Square(){
            id= 49,
            row= 6,
            col= 1,
            validMove= false
        },
                           new Square(){
            id= 50,
            row= 6,
            col= 2,
            validMove= false
        },
                            new Square(){
            id= 51,
            row= 6,
            col= 3,
            validMove= false
        },
                             new Square(){
            id= 52,
            row= 6,
            col= 4,
            validMove= false
        },
                              new Square(){
            id= 53,
            row= 6,
            col= 5,
            validMove= false
        },
                               new Square(){
            id= 54,
            row= 6,
            col= 6,
            validMove= false
        },
                                new Square(){
            id= 55,
            row= 6,
            col= 7,
            validMove= false
        },
                                 new Square(){
            id= 56,
            row= 7,
            col= 0,
            validMove= false
        },
                                  new Square(){
            id= 57,
            row= 7,
            col= 1,
            validMove= false
        },
                                   new Square(){
            id= 58,
            row= 7,
            col= 2,
            validMove= false
        },
                                    new Square(){
            id= 59,
            row= 7,
            col= 3,
            validMove= false
        },
                                     new Square(){
            id= 60,
            row= 7,
            col= 4,
            validMove= false
        },
                                      new Square(){
            id= 61,
            row= 7,
            col= 5,
            validMove= false
        },
                                       new Square(){
            id= 62,
            row= 7,
            col= 6,
            validMove= false
        },
                                        new Square(){
            id= 63,
            row= 7,
            col= 7,
            validMove= false

                }
        };


        [HttpGet]
        public IEnumerable<Square> GetSquares()
        {
            return Squares;

        }
        [HttpGet("{moves}")]
        public IActionResult GetMoves()
        {

            return Content("blue");
        }
    }
}
