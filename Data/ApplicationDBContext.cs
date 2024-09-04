using essay_app_c_sharp.Models;
using Microsoft.EntityFrameworkCore;

namespace essay_app_c_sharp.Data
{
    public class ApplicationDBContext: DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<Essay> Essays { get; set; }
        public DbSet<Correction> Corrections { get; set; }
    }
}