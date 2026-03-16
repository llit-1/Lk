using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lk.Server.DbContexts.RKNETDB.Models
{
    [ComplexType]
    public class TimeSheets
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Guid { get; set; } 
        public Personality Personalities { get; set; }
        public Location Location { get; set; }
        public JobTitle? JobTitle { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public int? Absence { get; set; }
        public decimal? BaseRate { get; set; }
        public decimal? LocationCashBonus { get; set; }
        public decimal? ExperienceCashBonus { get; set; }
        public decimal? PersonalCashBonus { get; set; }
        public decimal? TotalSalary { get; set; }

    }
}
