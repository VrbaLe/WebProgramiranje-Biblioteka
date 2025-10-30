namespace WebTemplate.Models{

    public class Biblioteka{
        
        [Key]
        public int ID {get; set;}

        public required string Naziv {get; set;}

        public List<Polica> police {get; set;}

    }

}