using essay_app_c_sharp.Dtos.Correction;
using essay_app_c_sharp.Interfaces;
using essay_app_c_sharp.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace essay_app_c_sharp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CorrectionController : ControllerBase
    {
        private readonly ICorrectionRepository _correctionRepository;
        private readonly IEssayRepository _essayRepository;

        public CorrectionController(ICorrectionRepository correctionRepository, IEssayRepository essayRepository)
        {
            _correctionRepository = correctionRepository;
            _essayRepository = essayRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCorrection([FromBody] CreateCorrectionDto correctionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var essayId = correctionDto.EssayId;
            if (!await _essayRepository.DoesEssayExist(essayId))
            {
                return NotFound();
            }
            var correction = correctionDto.ToModel(essayId);
            await _correctionRepository.CreateCorrectionAsync(correction);
            return Created("", new  {id = correction.Id});
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateCorrection([FromBody] UpdateCorrectionDto correctionDto, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _correctionRepository.UpdateCorrectionAsync(correctionDto, id);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCorrection([FromRoute] int id)
        {
            var isDeleted = await _correctionRepository.DeleteCorrectionAsync(id);
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}