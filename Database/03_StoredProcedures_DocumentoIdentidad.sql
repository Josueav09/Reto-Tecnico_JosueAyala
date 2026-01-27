-- =============================================
-- Stored Procedures: DocumentoIdentidad
-- =============================================

USE GestionBeneficiarios
GO

-- =============================================
-- SP: Listar Documentos de Identidad Activos
-- =============================================
CREATE OR ALTER PROCEDURE SP_DocumentoIdentidad_Listar
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        Id,
        Nombre,
        Abreviatura,
        Pais,
        Longitud,
        SoloNumeros,
        Activo
    FROM DocumentoIdentidad
    WHERE Activo = 1
    ORDER BY Nombre
END
GO

-- =============================================
-- SP: Obtener Documento de Identidad por ID
-- =============================================
CREATE OR ALTER PROCEDURE SP_DocumentoIdentidad_ObtenerPorId
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        Id,
        Nombre,
        Abreviatura,
        Pais,
        Longitud,
        SoloNumeros,
        Activo
    FROM DocumentoIdentidad
    WHERE Id = @Id
END
GO

-- =============================================
-- SP: Listar Todos los Documentos
-- =============================================
CREATE OR ALTER PROCEDURE SP_DocumentoIdentidad_ListarTodos
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        Id,
        Nombre,
        Abreviatura,
        Pais,
        Longitud,
        SoloNumeros,
        Activo
    FROM DocumentoIdentidad
    ORDER BY Nombre
END
GO
