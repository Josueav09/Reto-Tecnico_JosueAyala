# Sistema de Gestión de Beneficiarios

Sistema full-stack para la gestión de beneficiarios de programas sociales multi-país.

## 🏗️ Estructura del Proyecto

```
├── Database/          # Scripts SQL para base de datos
├── Backend/          # API .NET 8 con Dapper
└── Frontend/         # React + Vite + Tailwind
```

## 💻 Tecnologías

- **Backend**: .NET 8, ASP.NET Core, Dapper
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Base de Datos**: SQL Server

## � Instalación y Ejecución

### Prerrequisitos

- SQL Server (LocalDB o Express)
- .NET 8 SDK
- Node.js 18+ y npm

### 1. Base de Datos

Ejecuta los scripts en orden desde la carpeta `Database/`:

```bash
sqlcmd -S localhost -i Database/01_CrearBaseDatos.sql
sqlcmd -S localhost -i Database/02_DatosEjemplo.sql
sqlcmd -S localhost -i Database/03_StoredProcedures_DocumentoIdentidad.sql
sqlcmd -S localhost -i Database/04_StoredProcedures_Beneficiario.sql
```

### 2. Backend

```bash
cd Backend
dotnet restore
dotnet run
```

El backend estará disponible en `http://localhost:5000`

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📋 Funcionalidades

- ✅ Registro de beneficiarios con validación dinámica
- ✅ Soporte multi-país para documentos de identidad
- ✅ Validación de longitud y formato de documentos
- ✅ CRUD completo de beneficiarios
- ✅ Interfaz responsive y moderna

## 🗄️ Documentos de Identidad Soportados

| País | Documento | Abreviatura | Longitud |
|------|-----------|-------------|----------|
| Perú | DNI | DNI | 8 |
| Perú | Carnet de Extranjería | CE | 9 |
| Perú | RUC | RUC | 11 |
| Argentina | Cédula de Identidad | CI | 8 |
| Colombia | Cédula de Ciudadanía | CC | 10 |
| Chile | RUT | RUT | 9 |
| Internacional | Pasaporte | PAS | 12 |

## 📝 Licencia

Este proyecto fue creado como parte de un reto técnico.
