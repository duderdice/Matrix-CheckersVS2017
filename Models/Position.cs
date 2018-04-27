using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoApp.Models
{
    public class Position
    {
        public int Row;
        public int Column;
        public Position(int row, int col)
        {
            Row = row;
            Column = col;

        }
    }
}
