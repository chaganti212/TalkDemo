using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Repository_WebAPI.Models
{
    public class Talk
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Speaker { get; set; }
        public string Venue { get; set; }
        public int Duration { get; set; }
    }
}