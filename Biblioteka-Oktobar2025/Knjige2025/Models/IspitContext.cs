namespace WebTemplate.Models;

public class IspitContext : DbContext
{
    // DbSet kolekcije!
    public DbSet<Polica> Police {get; set;}
    public DbSet<Biblioteka> Biblioteke {get; set;}

    public IspitContext(DbContextOptions options) : base(options)
    {
        
    }
}
