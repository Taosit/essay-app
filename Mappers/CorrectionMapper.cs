using essay_app_c_sharp.Dtos.Correction;
using essay_app_c_sharp.Models;

namespace essay_app_c_sharp.Mappers
{
    public static class CorrectionMapper
    {
        public static CorrectionDto ToDto(this Correction correction)
        {
            return new CorrectionDto
            {
                Id = correction.Id,
                ParagraphNumber = correction.ParagraphNumber,
                StartIndex = correction.StartIndex,
                EndIndex = correction.EndIndex,
                CorrectedText = correction.CorrectedText,
                Comment = correction.Comment
            };
        }

        public static Correction ToModel(this CreateCorrectionDto correctionDto, int essayId)
        {
            return new Correction
            {
                ParagraphNumber = correctionDto.ParagraphNumber,
                StartIndex = correctionDto.StartIndex,
                EndIndex = correctionDto.EndIndex,
                CorrectedText = correctionDto.CorrectedText,
                Comment = correctionDto.Comment,
                EssayId = essayId,
            };  
        }
    }
}