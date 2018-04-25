using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DemoApp.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DemoApp.Controllers
{
    [Route("api/[controller]")]
    public class PointsController : Controller
    {
        [HttpGet]
        public IEnumerable<Point> GetPoints()
        {
            Point[] Points = new Point[]
            {
                new Point()
                {
                    color= "red",
                    count = 0

                },
                new Point()
                {
                    color= "black",
                    count = 0
                }
            };
            return Points;
        }


    }
}

