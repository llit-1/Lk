using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace lk.Server.DbContexts.RKNETDB.Models
{
    public class PersonalityVersion
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public JobTitle JobTitle { get; set; }
        public Location Location { get; set; }
        public DateTime HireDate { get; set; }
        public DateTime? DismissalsDate { get; set; }
        public Schedule? Schedule { get; set; }
        public Entity? Entity { get; set; }
        public Guid EntityCostGuid { get; set; }
        public DateTime? VersionStartDate { get; set; }
        public DateTime? VersionEndDate { get; set; }
        public Personality Personalities { get; set; }
        public int Actual { get; set; }
    }
}
