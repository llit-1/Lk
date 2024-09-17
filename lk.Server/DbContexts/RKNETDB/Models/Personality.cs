using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace lk.Server.DbContexts.RKNETDB.Models
{
    public class Personality
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Guid { get; set; }
        public string Name { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public DateTime BirthDate { get; set; }
        public string? PhoneCode { get; set; }
        public DateTime? LastPhoneCall { get; set; }
        public int? PhoneCallAttempts { get; set; }
        public JobTitle JobTitle { get; set; }
    }
}
