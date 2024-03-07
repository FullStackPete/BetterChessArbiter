using bcaAPI.Entities;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

namespace bcaAPI.DBContext
{
    public class BCAContext : DbContext
    {
        public BCAContext(DbContextOptions<BCAContext> options): base (options)
        {
            
        }

        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Adresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tournament>().ToCollection("Tournaments");
            modelBuilder.Entity<User>().ToCollection("Users");
            modelBuilder.Entity<Address>().ToCollection("Addresses");
        }
    }
}
