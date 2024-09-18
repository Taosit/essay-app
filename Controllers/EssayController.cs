using essay_app_c_sharp.Dtos.Essay;
using essay_app_c_sharp.Interfaces;
using essay_app_c_sharp.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace essay_app_c_sharp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EssayController: ControllerBase
    {
        private readonly IEssayRepository _essayRepository;
        private readonly ILogger<EssayController> _logger;
        public EssayController(IEssayRepository essayRepository, ILogger<EssayController> logger)
        {
            _essayRepository = essayRepository;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetEssays()
        {
            var essays = await _essayRepository.GetEssaysAsync();
            var essayDtos = essays.Select(e => e.ToDto());
            return Ok(essays);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetEssay([FromRoute] int id)
        {
            _logger.LogInformation("GetEssay skyrocket");
            var essay = await _essayRepository.GetEssayWithCorrections(id);
            if (essay == null)
            {
                return NotFound();
            }
            var essayDto = essay.ToDtoWithCorrections();
            return Ok(essayDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEssay([FromBody] CreateEssayDto essayDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var essay = essayDto.ToModel();
            await _essayRepository.CreateEssayAsync(essay);
            return CreatedAtAction(nameof(GetEssay), new { id = essay.Id }, essay.ToDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteEssay([FromRoute] int id)
        {
            var isDeleted = await _essayRepository.DeleteEssay(id);
            if (!isDeleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}