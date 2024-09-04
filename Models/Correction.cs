namespace essay_app_c_sharp.Models
{
    public class Correction
    {
        public int Id { get; set; }
        public int ParagraphNumber { get; set; }
        public int StartIndex { get; set; }
        public int EndIndex { get; set; }
        public string CorrectedText { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public int EssayId { get; set; }
        public Essay? Essay { get; set; }
    }
}