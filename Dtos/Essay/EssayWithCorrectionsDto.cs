using System.ComponentModel.DataAnnotations;
using essay_app_c_sharp.Dtos.Correction;
using essay_app_c_sharp.Models;

namespace essay_app_c_sharp.Dtos.Essay
{
    public class EssayWithCorrectionsDto
    {
        [Required]
        public int Id { get; set; }        
        [Required]
        [MinLength(5)]
        public required string Question { get; set; }
        [Required]
        [MinLength(5)]
        public required string EssayText { get; set; }
        public List<CorrectionDto> Corrections { get; set; } = new List<CorrectionDto>();
    }
}