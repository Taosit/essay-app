using essay_app_c_sharp.Dtos.Correction;
using essay_app_c_sharp.Models;

namespace essay_app_c_sharp.Interfaces
{
    public interface ICorrectionRepository
    {
        Task CreateCorrectionAsync(Correction correction);
        Task UpdateCorrectionAsync(UpdateCorrectionDto correction, int id);
        Task<bool> DeleteCorrectionAsync(int id);
    }
}