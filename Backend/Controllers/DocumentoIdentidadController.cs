using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentoIdentidadController : ControllerBase
    {
        private readonly IDocumentoIdentidadService _service;
        private readonly ILogger<DocumentoIdentidadController> _logger;

        public DocumentoIdentidadController(
            IDocumentoIdentidadService service,
            ILogger<DocumentoIdentidadController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var documentos = await _service.GetAllActiveAsync();
                return Ok(documentos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener documentos de identidad");
                return StatusCode(500, new { message = "Error al obtener documentos de identidad" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var documento = await _service.GetByIdAsync(id);
                if (documento == null)
                    return NotFound(new { message = "Documento de identidad no encontrado" });

                return Ok(documento);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener documento de identidad {Id}", id);
                return StatusCode(500, new { message = "Error al obtener documento de identidad" });
            }
        }
    }
}
