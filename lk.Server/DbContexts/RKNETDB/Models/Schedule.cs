using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace lk.Server.DbContexts.RKNETDB.Models
{
    public class Schedule
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public TimeSpan BeginTime { get; set; }
        public TimeSpan EndTime { get; set; }

        [Column("JobTitle")]
        public Guid JobTitleGuid { get; set; }

        [ForeignKey("JobTitleGuid")]
        public JobTitle JobTitle { get; set; }
    }
}
