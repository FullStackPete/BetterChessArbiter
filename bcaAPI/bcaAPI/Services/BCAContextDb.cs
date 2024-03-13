using bcaAPI.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

namespace bcaAPI.DBContext
{
    public class BCAContextDb : DbContext
    {
        public BCAContextDb(DbContextOptions<BCAContextDb> options): base (options)
        {
            
        }

        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tournament>();
            modelBuilder.Entity<User>();
            modelBuilder.Entity<Address>();
        }
    }
}
