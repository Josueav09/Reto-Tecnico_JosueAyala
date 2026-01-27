using Backend.Models;
using Backend.Models.DTOs;

namespace Backend.Services
{
    public interface IBeneficiarioService
    {
        Task<IEnumerable<BeneficiarioDTO>> GetAllAsync();
        Task<BeneficiarioDTO?> GetByIdAsync(int id);
        Task<int> CreateAsync(CreateUpdateBeneficiarioDTO beneficiario);
        Task<bool> UpdateAsync(int id, CreateUpdateBeneficiarioDTO beneficiario);
        Task<bool> DeleteAsync(int id);
    }
}
