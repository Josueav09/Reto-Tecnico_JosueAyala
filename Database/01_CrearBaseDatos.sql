-- =============================================
-- Script: Creación de Base de Datos y Tablas
-- Sistema de Gestión de Beneficiarios
-- =============================================

-- Crear base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'GestionBeneficiarios')
BEGIN
    CREATE DATABASE GestionBeneficiarios
END
GO

USE GestionBeneficiarios
GO

-- =============================================
-- Tabla: DocumentoIdentidad
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'DocumentoIdentidad')
BEGIN
    CREATE TABLE DocumentoIdentidad (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nombre VARCHAR(50) NOT NULL,
        Abreviatura VARCHAR(10) NOT NULL,
        Pais VARCHAR(50) NOT NULL,
        Longitud INT NOT NULL,
        SoloNumeros BIT NOT NULL DEFAULT 1,
        Activo BIT NOT NULL DEFAULT 1,
        FechaCreacion DATETIME DEFAULT GETDATE(),
        FechaModificacion DATETIME NULL
    )
END
GO

-- =============================================
-- Tabla: Beneficiario
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Beneficiario')
BEGIN
    CREATE TABLE Beneficiario (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nombres VARCHAR(100) NOT NULL,
        Apellidos VARCHAR(100) NOT NULL,
        DocumentoIdentidadId INT NOT NULL,
        NumeroDocumento VARCHAR(20) NOT NULL,
        FechaNacimiento DATE NOT NULL,
        Sexo CHAR(1) NOT NULL CHECK (Sexo IN ('M', 'F')),
        FechaCreacion DATETIME DEFAULT GETDATE(),
        FechaModificacion DATETIME NULL,
        CONSTRAINT FK_Beneficiario_DocumentoIdentidad 
            FOREIGN KEY (DocumentoIdentidadId) 
            REFERENCES DocumentoIdentidad(Id)
    )
END
GO

-- Índices para mejor rendimiento
CREATE NONCLUSTERED INDEX IX_Beneficiario_DocumentoIdentidadId 
ON Beneficiario(DocumentoIdentidadId)
GO

CREATE NONCLUSTERED INDEX IX_Beneficiario_NumeroDocumento 
ON Beneficiario(NumeroDocumento)
GO
