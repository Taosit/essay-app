using essay_app_c_sharp.Data;
using essay_app_c_sharp.Dtos.Correction;
using essay_app_c_sharp.Interfaces;
using essay_app_c_sharp.Models;
using Microsoft.EntityFrameworkCore;

namespace essay_app_c_sharp.Repository
{
    public class CorrectionRepository : ICorrectionRepository
    {
        private readonly ApplicationDBContext _context;
        public CorrectionRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task CreateCorrectionAsync(Correction correction)
        {
            await _context.Corrections.AddAsync(correction);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCorrectionAsync(UpdateCorrectionDto correction, int id)
        {
            var correctionToUpdate = await _context.Corrections.FirstOrDefaultAsync(c => c.Id == id);
            if (correctionToUpdate == null)
            {
                return;
            }
            correctionToUpdate.CorrectedText = correction.CorrectedText;
            correctionToUpdate.Comment = correction.Comment;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteCorrectionAsync(int id)
        {
            var correction = await _context.Corrections.FirstOrDefaultAsync(c => c.Id == id);
            if (correction == null)
            {
                return false;
            }
            _context.Corrections.Remove(correction);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}