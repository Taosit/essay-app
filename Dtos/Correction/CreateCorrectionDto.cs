using System.ComponentModel.DataAnnotations;

namespace essay_app_c_sharp.Dtos.Correction
{
    public class CreateCorrectionDto
    {
        [Required]
        public int ParagraphNumber { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int StartIndex { get; set; }
        [Required]
        [Range(0, int.MaxValue)]
        public int EndIndex { get; set; }
        [Required]
        public string CorrectedText { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        [Required]
        public int EssayId { get; set; }
    }
}