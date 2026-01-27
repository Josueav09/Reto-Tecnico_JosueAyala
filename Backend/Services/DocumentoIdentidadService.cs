using Backend.Data;
using Backend.Models;
using Microsoft.Data.SqlClient;
using Dapper;

namespace Backend.Services
{
    public class DocumentoIdentidadService : IDocumentoIdentidadService
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public DocumentoIdentidadService(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<DocumentoIdentidad>> GetAllActiveAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            return await connection.QueryAsync<DocumentoIdentidad>(
                "SP_DocumentoIdentidad_Listar",
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<DocumentoIdentidad?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<DocumentoIdentidad>(
                "SP_DocumentoIdentidad_ObtenerPorId",
                new { Id = id },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }
    }
}
