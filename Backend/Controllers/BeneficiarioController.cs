using Backend.Models.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeneficiarioController : ControllerBase
    {
        private readonly IBeneficiarioService _service;
        private readonly ILogger<BeneficiarioController> _logger;

        public BeneficiarioController(
            IBeneficiarioService service,
            ILogger<BeneficiarioController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var beneficiarios = await _service.GetAllAsync();
                return Ok(beneficiarios);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener beneficiarios");
                return StatusCode(500, new { message = "Error al obtener beneficiarios" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var beneficiario = await _service.GetByIdAsync(id);
                if (beneficiario == null)
                    return NotFound(new { message = "Beneficiario no encontrado" });

                return Ok(beneficiario);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener beneficiario {Id}", id);
                return StatusCode(500, new { message = "Error al obtener beneficiario" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUpdateBeneficiarioDTO beneficiario)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var id = await _service.CreateAsync(beneficiario);
                var createdBeneficiario = await _service.GetByIdAsync(id);

                return CreatedAtAction(nameof(GetById), new { id }, createdBeneficiario);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear beneficiario");
                
                if (ex.Message.Contains("Ya existe"))
                    return Conflict(new { message = ex.Message });

                return StatusCode(500, new { message = "Error al crear beneficiario" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateUpdateBeneficiarioDTO beneficiario)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                await _service.UpdateAsync(id, beneficiario);
                var updatedBeneficiario = await _service.GetByIdAsync(id);

                return Ok(updatedBeneficiario);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar beneficiario {Id}", id);
                
                if (ex.Message.Contains("no existe"))
                    return NotFound(new { message = ex.Message });
                
                if (ex.Message.Contains("Ya existe"))
                    return Conflict(new { message = ex.Message });

                return StatusCode(500, new { message = "Error al actualizar beneficiario" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar beneficiario {Id}", id);
                
                if (ex.Message.Contains("no existe"))
                    return NotFound(new { message = ex.Message });

                return StatusCode(500, new { message = "Error al eliminar beneficiario" });
            }
        }
    }
}
