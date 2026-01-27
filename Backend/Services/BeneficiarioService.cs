using Backend.Data;
using Backend.Models;
using Backend.Models.DTOs;
using Microsoft.Data.SqlClient;
using Dapper;

namespace Backend.Services
{
    public class BeneficiarioService : IBeneficiarioService
    {
        private readonly SqlConnectionFactory _connectionFactory;

        public BeneficiarioService(SqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<BeneficiarioDTO>> GetAllAsync()
        {
            using var connection = _connectionFactory.CreateConnection();
            return await connection.QueryAsync<BeneficiarioDTO>(
                "SP_Beneficiario_Listar",
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<BeneficiarioDTO?> GetByIdAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<BeneficiarioDTO>(
                "SP_Beneficiario_ObtenerPorId",
                new { Id = id },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<int> CreateAsync(CreateUpdateBeneficiarioDTO beneficiario)
        {
            using var connection = _connectionFactory.CreateConnection();
            
            var result = await connection.QueryFirstOrDefaultAsync<int>(
                "SP_Beneficiario_Insertar",
                new
                {
                    Nombres = beneficiario.Nombres,
                    Apellidos = beneficiario.Apellidos,
                    DocumentoIdentidadId = beneficiario.DocumentoIdentidadId,
                    NumeroDocumento = beneficiario.NumeroDocumento,
                    FechaNacimiento = beneficiario.FechaNacimiento,
                    Sexo = beneficiario.Sexo
                },
                commandType: System.Data.CommandType.StoredProcedure
            );

            return result;
        }

        public async Task<bool> UpdateAsync(int id, CreateUpdateBeneficiarioDTO beneficiario)
        {
            using var connection = _connectionFactory.CreateConnection();
            
            await connection.ExecuteAsync(
                "SP_Beneficiario_Actualizar",
                new
                {
                    Id = id,
                    Nombres = beneficiario.Nombres,
                    Apellidos = beneficiario.Apellidos,
                    DocumentoIdentidadId = beneficiario.DocumentoIdentidadId,
                    NumeroDocumento = beneficiario.NumeroDocumento,
                    FechaNacimiento = beneficiario.FechaNacimiento,
                    Sexo = beneficiario.Sexo
                },
                commandType: System.Data.CommandType.StoredProcedure
            );

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using var connection = _connectionFactory.CreateConnection();
            
            await connection.ExecuteAsync(
                "SP_Beneficiario_Eliminar",
                new { Id = id },
                commandType: System.Data.CommandType.StoredProcedure
            );

            return true;
        }
    }
}
