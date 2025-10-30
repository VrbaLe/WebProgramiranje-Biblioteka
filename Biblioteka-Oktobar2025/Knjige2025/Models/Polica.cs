namespace WebTemplate.Models{

    public class Polica{
        
        [Key]
        public int ID {get;set;}

        public required string Oznaka {get; set;}

        public required uint maksimalnoKnjiga {get;  set;}

        public required uint trenutnoKnjiga {get; set;}

        public Biblioteka policaBiblioteka {get; set;}

    }

}