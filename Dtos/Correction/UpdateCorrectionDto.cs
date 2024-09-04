using System.ComponentModel.DataAnnotations;

namespace essay_app_c_sharp.Dtos.Correction
{
    public class UpdateCorrectionDto
    {
        [Required]
        public string CorrectedText { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
    }
}