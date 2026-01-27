using Backend.Models;

namespace Backend.Services
{
    public interface IDocumentoIdentidadService
    {
        Task<IEnumerable<DocumentoIdentidad>> GetAllActiveAsync();
        Task<DocumentoIdentidad?> GetByIdAsync(int id);
    }
}
