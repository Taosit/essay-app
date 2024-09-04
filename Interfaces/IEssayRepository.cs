using essay_app_c_sharp.Models;

namespace essay_app_c_sharp.Interfaces
{
    public interface IEssayRepository
    {
        Task<bool> DoesEssayExist(int id);
        Task<List<Essay>> GetEssaysAsync();
        Task<Essay?> GetEssayWithCorrections(int id);
        Task CreateEssayAsync(Essay essay);
        Task<bool> DeleteEssay(int id);
    }
}