-- =============================================
-- Script: Corrección de IDs de Documentos
-- Arregla el problema donde DNI tiene ID=0
-- =============================================

USE GestionBeneficiarios
GO

-- Limpiar datos existentes
DELETE FROM Beneficiario
DELETE FROM DocumentoIdentidad
GO

-- Reiniciar el contador de identidad correctamente
-- RESEED con 1 asegura que el próximo valor sea 1
DBCC CHECKIDENT ('DocumentoIdentidad', RESEED, 1)
DBCC CHECKIDENT ('Beneficiario', RESEED, 1)
GO

-- Insertar Documentos de Identidad (ahora comenzando desde ID=1)
SET IDENTITY_INSERT DocumentoIdentidad ON
GO

INSERT INTO DocumentoIdentidad (Id, Nombre, Abreviatura, Pais, Longitud, SoloNumeros, Activo)
VALUES 
    (1, 'Documento Nacional de Identidad', 'DNI', 'Perú', 8, 1, 1),
    (2, 'Carnet de Extranjería', 'CE', 'Perú', 9, 1, 1),
    (3, 'Pasaporte', 'PAS', 'Internacional', 12, 0, 1),
    (4, 'RUC', 'RUC', 'Perú', 11, 1, 1),
    (5, 'Cédula de Identidad', 'CI', 'Argentina', 8, 1, 1),
    (6, 'Cédula de Ciudadanía', 'CC', 'Colombia', 10, 1, 1),
    (7, 'RUT', 'RUT', 'Chile', 9, 0, 1),
    (8, 'Registro Civil', 'RC', 'Internacional', 10, 1, 0) -- Inactivo
GO

SET IDENTITY_INSERT DocumentoIdentidad OFF
GO

-- Insertar algunos beneficiarios de ejemplo (usando formato idéntico al 02_DatosEjemplo.sql)
INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
VALUES 
    ('Juan Carlos', 'Pérez García', 1, '12345678', '1990-05-15', 'M'),
    ('María Elena', 'Rodríguez López', 1, '87654321', '1985-08-22', 'F'),
    ('Pedro José', 'Martínez Silva', 2, '123456789', '1992-03-10', 'M')
GO

-- Verificar que los IDs sean correctos
SELECT Id, Nombre, Abreviatura, Pais FROM DocumentoIdentidad WHERE Activo = 1 ORDER BY Id
GO
