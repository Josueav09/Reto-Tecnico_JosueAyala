namespace Backend.Models.DTOs
{
    public class BeneficiarioDTO
    {
        public int Id { get; set; }
        public string Nombres { get; set; } = string.Empty;
        public string Apellidos { get; set; } = string.Empty;
        public int DocumentoIdentidadId { get; set; }
        public string DocumentoIdentidadNombre { get; set; } = string.Empty;
        public string DocumentoIdentidadAbreviatura { get; set; } = string.Empty;
        public string NumeroDocumento { get; set; } = string.Empty;
        public DateTime FechaNacimiento { get; set; }
        public char Sexo { get; set; }
        public string NombreCompleto => $"{Nombres} {Apellidos}";
    }
}
