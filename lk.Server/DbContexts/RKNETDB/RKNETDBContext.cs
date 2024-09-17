using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace lk.Server.DbContexts.RKNETDB
{
    public class RKNETDBContext : DbContext
    {
        public RKNETDBContext(DbContextOptions<RKNETDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<DbContexts.RKNETDB.Models.Personality> Personalities { get; set; } // сотрудники
        public DbSet<DbContexts.RKNETDB.Models.PersonalityVersion> PersonalityVersions { get; set; } // версии сотрудников
        public DbSet<DbContexts.RKNETDB.Models.Entity> Entity { get; set; } // юридические лица
        public DbSet<DbContexts.RKNETDB.Models.JobTitle> JobTitle { get; set; } // должность
        public DbSet<DbContexts.RKNETDB.Models.Schedule> Schedules { get; set; } // типы смен
        public DbSet<DbContexts.RKNETDB.Models.Location> Locations { get; set; } // локация


    }
}
