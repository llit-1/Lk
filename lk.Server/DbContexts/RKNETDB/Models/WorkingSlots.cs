using lk.Server.DbContexts.RKNETDB.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace lk.Server.DbContexts.RKNETDB.Models
{
    [ComplexType]
    public class WorkingSlots
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public Personality? Personalities { get; set; }
        public Location? Locations { get; set; }
        public  JobTitle? JobTitles { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public int Status { get; set; }
    }
}

