namespace essay_app_c_sharp.Models
{
    public class Essay
    {
        public int Id { get; set; }
        public string Question { get; set; } = string.Empty;

        public string EssayText { get; set; } = string.Empty;
        public List<Correction> Corrections { get; set; } = new List<Correction>();
    }
}