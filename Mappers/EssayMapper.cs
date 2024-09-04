using essay_app_c_sharp.Dtos.Essay;
using essay_app_c_sharp.Models;

namespace essay_app_c_sharp.Mappers
{
    public static class EssayMapper
    {
        public static EssayDto ToDto(this Essay essay)
        {
            return new EssayDto
            {
                Id = essay.Id,
                Question = essay.Question,
                EssayText = essay.EssayText
            };
        }

        public static Essay ToModel(this EssayDto essayDto)
        {
            return new Essay
            {
                Id = essayDto.Id,
                Question = essayDto.Question,
                EssayText = essayDto.EssayText
            };
        }
        public static Essay ToModel(this CreateEssayDto essayDto)
        {
            return new Essay
            {
                Question = essayDto.Question,
                EssayText = essayDto.EssayText
            };
        }

        public static EssayWithCorrectionsDto ToDtoWithCorrections(this Essay essay)
        {
            return new EssayWithCorrectionsDto
            {
                Id = essay.Id,
                Question = essay.Question,
                EssayText = essay.EssayText,
                Corrections = essay.Corrections.Select(c => c.ToDto()).ToList()
            };
        }
    }
}