using essay_app_c_sharp.Data;
using essay_app_c_sharp.Interfaces;
using essay_app_c_sharp.Models;
using Microsoft.EntityFrameworkCore;

namespace essay_app_c_sharp.Repository
{
    public class EssayRepository : IEssayRepository
    {
        private readonly ApplicationDBContext _context;
        public EssayRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public Task<List<Essay>> GetEssaysAsync()
        {
            return _context.Essays.ToListAsync();
        }

        public Task<Essay?> GetEssayWithCorrections(int id)
        {
            throw new NotImplementedException();
            // return _context.Essays.Include(e => e.Corrections).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task CreateEssayAsync(Essay essay)
        {
            await _context.Essays.AddAsync(essay);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteEssay(int id)
        {
            var essay = await _context.Essays.FirstOrDefaultAsync(e => e.Id == id);
            if (essay == null)
            {
                return false;
            }
            _context.Essays.Remove(essay);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<bool> DoesEssayExist(int id)
        {
            return _context.Essays.AnyAsync(e => e.Id == id);
        }
    }
}