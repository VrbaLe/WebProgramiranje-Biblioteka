namespace WebTemplate.Controllers;

[ApiController]
[Route("[controller]")]
public class IspitController : ControllerBase
{
    public IspitContext Context { get; set; }

    public IspitController(IspitContext context)
    {
        Context = context;
    }
    

    [HttpGet("VratiBiblioteke()")]
    public async Task<ActionResult> VratiBiblioteke()
    {
        try{
            var biblioteke = await Context.Biblioteke
            .Include(b => b.police)
            .Select(b => new
            {
                naziv = b.Naziv,
                police = b.police.Select(p => new
                {
                    oznaka = p.Oznaka,
                    maksimalnoKnjiga = p.maksimalnoKnjiga,
                    trenutnoKnjiga = p.trenutnoKnjiga
                }).ToList()
            })
            .ToListAsync();

            return Ok(biblioteke);
        }

        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }


    [HttpPut("DodajKnjigu/{idBiblioteke}/{oznaka}/{brojKnjiga}")]
    public async Task<ActionResult> DodajKnjigu(int idBiblioteke, string oznaka, uint brojKnjiga)
    {
        try{
            var biblioteka = await Context.Biblioteke.Include(p=>p.police).FirstOrDefaultAsync(p=>p.ID==idBiblioteke);

            
            if (biblioteka == null){
                return NotFound($"Biblioteka sa ID = {idBiblioteke} ne postoji.");
            }

            var polica= biblioteka.police.FirstOrDefault(p=>p.Oznaka==oznaka);

            if (polica == null){
                return NotFound($"Polica ne postoji u biblioteci {biblioteka.Naziv}.");
            }

            if (polica.trenutnoKnjiga + brojKnjiga > polica.maksimalnoKnjiga)
            {
                return BadRequest($"Nema dovoljno mesta! Maksimalno je {polica.maksimalnoKnjiga}, trenutno ima {polica.trenutnoKnjiga}.");
            }

            polica.trenutnoKnjiga+=brojKnjiga;

            Context.Police.Update(polica);
            await Context.SaveChangesAsync();
            return Ok("Uspesno dodato");
        }

        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
