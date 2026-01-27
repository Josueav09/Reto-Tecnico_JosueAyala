-- =============================================
-- Stored Procedures: Beneficiario
-- =============================================

USE GestionBeneficiarios
GO

-- =============================================
-- SP: Listar Todos los Beneficiarios
-- =============================================
CREATE OR ALTER PROCEDURE SP_Beneficiario_Listar
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        B.Id,
        B.Nombres,
        B.Apellidos,
        B.DocumentoIdentidadId,
        D.Nombre AS DocumentoIdentidadNombre,
        D.Abreviatura AS DocumentoIdentidadAbreviatura,
        B.NumeroDocumento,
        B.FechaNacimiento,
        B.Sexo
    FROM Beneficiario B
    INNER JOIN DocumentoIdentidad D ON B.DocumentoIdentidadId = D.Id
    ORDER BY B.Apellidos, B.Nombres
END
GO

-- =============================================
-- SP: Obtener Beneficiario por ID
-- =============================================
CREATE OR ALTER PROCEDURE SP_Beneficiario_ObtenerPorId
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        B.Id,
        B.Nombres,
        B.Apellidos,
        B.DocumentoIdentidadId,
        D.Nombre AS DocumentoIdentidadNombre,
        D.Abreviatura AS DocumentoIdentidadAbreviatura,
        B.NumeroDocumento,
        B.FechaNacimiento,
        B.Sexo
    FROM Beneficiario B
    INNER JOIN DocumentoIdentidad D ON B.DocumentoIdentidadId = D.Id
    WHERE B.Id = @Id
END
GO

-- =============================================
-- SP: Insertar Beneficiario
-- =============================================
CREATE OR ALTER PROCEDURE SP_Beneficiario_Insertar
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validar que el documento de identidad existe y está activo
        IF NOT EXISTS (SELECT 1 FROM DocumentoIdentidad WHERE Id = @DocumentoIdentidadId AND Activo = 1)
        BEGIN
            RAISERROR('El documento de identidad no existe o no está activo', 16, 1)
            RETURN
        END
        
        -- Validar que no exista otro beneficiario con el mismo documento
        IF EXISTS (SELECT 1 FROM Beneficiario WHERE NumeroDocumento = @NumeroDocumento AND DocumentoIdentidadId = @DocumentoIdentidadId)
        BEGIN
            RAISERROR('Ya existe un beneficiario con este número de documento', 16, 1)
            RETURN
        END
        
        -- Insertar beneficiario
        INSERT INTO Beneficiario (Nombres, Apellidos, DocumentoIdentidadId, NumeroDocumento, FechaNacimiento, Sexo)
        VALUES (@Nombres, @Apellidos, @DocumentoIdentidadId, @NumeroDocumento, @FechaNacimiento, @Sexo)
        
        -- Retornar el ID insertado
        SELECT SCOPE_IDENTITY() AS Id
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END
GO

-- =============================================
-- SP: Actualizar Beneficiario
-- =============================================
CREATE OR ALTER PROCEDURE SP_Beneficiario_Actualizar
    @Id INT,
    @Nombres VARCHAR(100),
    @Apellidos VARCHAR(100),
    @DocumentoIdentidadId INT,
    @NumeroDocumento VARCHAR(20),
    @FechaNacimiento DATE,
    @Sexo CHAR(1)
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validar que el beneficiario existe
        IF NOT EXISTS (SELECT 1 FROM Beneficiario WHERE Id = @Id)
        BEGIN
            RAISERROR('El beneficiario no existe', 16, 1)
            RETURN
        END
        
        -- Validar que el documento de identidad existe y está activo
        IF NOT EXISTS (SELECT 1 FROM DocumentoIdentidad WHERE Id = @DocumentoIdentidadId AND Activo = 1)
        BEGIN
            RAISERROR('El documento de identidad no existe o no está activo', 16, 1)
            RETURN
        END
        
        -- Validar que no exista otro beneficiario con el mismo documento (excepto el actual)
        IF EXISTS (SELECT 1 FROM Beneficiario WHERE NumeroDocumento = @NumeroDocumento AND DocumentoIdentidadId = @DocumentoIdentidadId AND Id <> @Id)
        BEGIN
            RAISERROR('Ya existe otro beneficiario con este número de documento', 16, 1)
            RETURN
        END
        
        -- Actualizar beneficiario
        UPDATE Beneficiario
        SET 
            Nombres = @Nombres,
            Apellidos = @Apellidos,
            DocumentoIdentidadId = @DocumentoIdentidadId,
            NumeroDocumento = @NumeroDocumento,
            FechaNacimiento = @FechaNacimiento,
            Sexo = @Sexo,
            FechaModificacion = GETDATE()
        WHERE Id = @Id
        
        SELECT @Id AS Id
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END
GO

-- =============================================
-- SP: Eliminar Beneficiario
-- =============================================
CREATE OR ALTER PROCEDURE SP_Beneficiario_Eliminar
    @Id INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        -- Validar que el beneficiario existe
        IF NOT EXISTS (SELECT 1 FROM Beneficiario WHERE Id = @Id)
        BEGIN
            RAISERROR('El beneficiario no existe', 16, 1)
            RETURN
        END
        
        -- Eliminar beneficiario
        DELETE FROM Beneficiario WHERE Id = @Id
        
        SELECT @Id AS Id
    END TRY
    BEGIN CATCH
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE()
        RAISERROR(@ErrorMessage, 16, 1)
    END CATCH
END
GO
