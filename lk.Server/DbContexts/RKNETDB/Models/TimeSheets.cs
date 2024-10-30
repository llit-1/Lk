using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lk.Server.DbContexts.RKNETDB.Models
{
    [ComplexType]
    public class TimeSheets
    {

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Guid { get; set; }
        public Personality? Personalities { get; set; }
        public Location? Location { get; set; }
        public JobTitle? JobTitle { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }

    }
}
