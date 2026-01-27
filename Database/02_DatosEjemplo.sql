-- =============================================
-- Script: Inserción de Datos de Ejemplo
-- Documentos de Identidad
-- =============================================

USE GestionBeneficiarios
GO

-- Limpiar datos existentes (solo para desarrollo)
DELETE FROM Beneficiario
DELETE FROM DocumentoIdentidad
DBCC CHECKIDENT ('DocumentoIdentidad', RESEED, 1)
DBCC CHECKIDENT ('Beneficiario', RESEED, 1)
GO

-- Insertar Documentos de Identidad
INSERT INTO DocumentoIdentidad (Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
VALUES 
    ('Documento Nacional de Identidad', 'DNI', 'Perú', 8, 1, 1),
    ('Carnet de Extranjería', 'CE', 'Perú', 9, 1, 1),
    ('Pasaporte', 'PAS', 'Internacional', 12, 0, 1),
    ('RUC', 'RUC', 'Perú', 11, 1, 1),
    ('Cédula de Identidad', 'CI', 'Argentina', 8, 1, 1),
    ('Cédula de Ciudadanía', 'CC', 'Colombia', 10, 1, 1),
    ('RUT', 'RUT', 'Chile', 9, 0, 1),
    ('Registro Civil', 'RC', 'Internacional', 10, 1, 0) -- Inactivo
GO

-- Insertar algunos beneficiarios de ejemplo
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
    ('Juan Carlos', 'Pérez García', 1, '12345678', '1990-05-15', 'M'),
    ('María Elena', 'Rodríguez López', 1, '87654321', '1985-08-22', 'F'),
    ('Pedro José', 'Martínez Silva', 2, '123456789', '1992-03-10', 'M')
GO
