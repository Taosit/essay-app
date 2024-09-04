using System.ComponentModel.DataAnnotations;

namespace essay_app_c_sharp.Dtos.Essay
{
    public class CreateEssayDto
    {
        [Required]
        [MinLength(5)]
        public required string Question { get; set; }
        [Required]
        [MinLength(5)]
        public required string EssayText { get; set; }
    }
}