# Sistema de Gestión de Beneficiarios

Sistema full-stack para la gestión de beneficiarios de programas sociales multi-país, con validación dinámica de documentos de identidad y soporte para múltiples países.

## 🏗️ Estructura del Proyecto

```
Reto-Tecnico_JosueAyala/
├── Database/              # Scripts SQL para base de datos
│   ├── 01_CrearBaseDatos.sql
│   ├── 02_DatosEjemplo.sql
│   ├── 03_StoredProcedures_DocumentoIdentidad.sql
│   └── 04_StoredProcedures_Beneficiario.sql
├── Backend/              # API REST con .NET 8
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   └── Program.cs
└── Frontend/            # Aplicación React
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── types/
    └── package.json
```

## 💻 Tecnologías Utilizadas

### Backend
- **.NET 8** - Framework principal
- **ASP.NET Core** - API REST
- **Dapper** - Micro ORM para acceso a datos
- **SQL Server** - Base de datos

### Frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

1. **SQL Server** (LocalDB, Express o Full)
   - [Descargar SQL Server Express](https://www.microsoft.com/es-es/sql-server/sql-server-downloads)
   - O usar SQL Server LocalDB (incluido con Visual Studio)

2. **.NET 8 SDK**
   - [Descargar .NET 8](https://dotnet.microsoft.com/download/dotnet/8.0)
   - Verificar instalación: `dotnet --version`

3. **Node.js 18+ y npm**
   - [Descargar Node.js](https://nodejs.org/)
   - Verificar instalación: `node --version` y `npm --version`

## 🚀 Instrucciones de Instalación

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Josueav09/Reto-Tecnico_JosueAyala.git
cd Reto-Tecnico_JosueAyala
```

### 2️⃣ Configurar Base de Datos

#### Opción A: Usando SQL Server Management Studio (SSMS)

1. Abre SSMS y conéctate a tu instancia de SQL Server
2. Abre y ejecuta cada script en orden:
   - `Database/01_CrearBaseDatos.sql` - Crea la base de datos y tablas
   - `Database/02_DatosEjemplo.sql` - Inserta datos de ejemplo
   - `Database/03_StoredProcedures_DocumentoIdentidad.sql` - Crea SPs para documentos
   - `Database/04_StoredProcedures_Beneficiario.sql` - Crea SPs para beneficiarios

#### Opción B: Usando línea de comandos (sqlcmd)

```bash
# Ejecutar desde la raíz del proyecto
sqlcmd -S localhost -i Database/01_CrearBaseDatos.sql
sqlcmd -S localhost -i Database/02_DatosEjemplo.sql
sqlcmd -S localhost -i Database/03_StoredProcedures_DocumentoIdentidad.sql
sqlcmd -S localhost -i Database/04_StoredProcedures_Beneficiario.sql
```

> **Nota**: Si usas una instancia con nombre, reemplaza `localhost` por `localhost\NOMBRE_INSTANCIA`

#### Scripts de Base de Datos

| Script | Descripción |
|--------|-------------|
| `01_CrearBaseDatos.sql` | Crea la base de datos `GestionBeneficiarios` y las tablas `DocumentoIdentidad` y `Beneficiario` |
| `02_DatosEjemplo.sql` | Inserta 7 tipos de documentos de identidad y 3 beneficiarios de ejemplo |
| `03_StoredProcedures_DocumentoIdentidad.sql` | Crea procedimientos almacenados para listar documentos activos |
| `04_StoredProcedures_Beneficiario.sql` | Crea procedimientos CRUD para gestión de beneficiarios |

### 3️⃣ Configurar y Ejecutar Backend

```bash
cd Backend

# Restaurar dependencias
dotnet restore

# (Opcional) Verificar que la cadena de conexión sea correcta
# Editar appsettings.json si es necesario

# Ejecutar el proyecto
dotnet run
```

El backend estará disponible en:
- **HTTP**: `http://localhost:5000`
- **HTTPS**: `https://localhost:5001`
- **Swagger**: `http://localhost:5000/swagger`

#### Configuración de Conexión

Por defecto, el backend usa autenticación de Windows. Si necesitas cambiar la cadena de conexión, edita `Backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GestionBeneficiarios;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true;"
  }
}
```

### 4️⃣ Configurar y Ejecutar Frontend

```bash
cd Frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🎯 Instrucciones para Ejecutar el Proyecto

### Inicio Rápido (Una vez instalado)

1. **Terminal 1 - Backend**:
   ```bash
   cd Backend
   dotnet run
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```

3. **Abrir navegador**: `http://localhost:5173`

### Flujo de Uso

1. La aplicación mostrará la lista de beneficiarios registrados
2. Haz clic en **"+ Nuevo Beneficiario"** para registrar uno nuevo
3. Completa el formulario:
   - Selecciona el tipo de documento (DNI, CE, Pasaporte, etc.)
   - El campo de número de documento se validará automáticamente según el tipo seleccionado
   - Completa nombre, apellidos, fecha de nacimiento y sexo
4. Haz clic en **"Registrar"** o **"Actualizar"**
5. Usa los botones **"Editar"** o **"Eliminar"** en la tabla para gestionar beneficiarios

## 📋 Funcionalidades Principales

### ✅ Gestión de Beneficiarios
- Crear, leer, actualizar y eliminar (CRUD completo)
- Validación de datos en tiempo real
- Búsqueda y filtrado

### ✅ Validación Dinámica de Documentos
- Validación automática según el tipo de documento seleccionado
- Longitud exacta requerida
- Formato numérico o alfanumérico según corresponda
- Feedback visual en tiempo real

### ✅ Soporte Multi-País
- 7 tipos de documentos de identidad de 4 países
- Gestión centralizada de reglas de validación por país

## 🗄️ Documentos de Identidad Soportados

| País | Documento | Abreviatura | Longitud | Solo Números |
|------|-----------|-------------|----------|--------------|
| Perú | Documento Nacional de Identidad | DNI | 8 | ✓ |
| Perú | Carnet de Extranjería | CE | 9 | ✓ |
| Perú | RUC | RUC | 11 | ✓ |
| Argentina | Cédula de Identidad | CI | 8 | ✓ |
| Colombia | Cédula de Ciudadanía | CC | 10 | ✓ |
| Chile | RUT | RUT | 9 | ✗ |
| Internacional | Pasaporte | PAS | 12 | ✗ |

## � Solución de Problemas

### Backend no inicia
- Verifica que SQL Server esté ejecutándose
- Comprueba la cadena de conexión en `appsettings.json`
- Asegúrate de que los scripts de base de datos se ejecutaron correctamente

### Error de puerto en uso
- Si el puerto 5000 está ocupado, cambia el puerto en `Program.cs` o `launchSettings.json`

### Frontend no conecta con el backend
- Verifica que el backend esté corriendo en `http://localhost:5000`
- Revisa la configuración de CORS en `Backend/Program.cs`
- Comprueba la URL del API en `Frontend/src/services/api.ts`

## 🏛️ Arquitectura

### Backend
- **Controllers**: Endpoints REST API
- **Services**: Lógica de negocio
- **Data**: Acceso a datos con Dapper
- **Models**: DTOs y entidades

### Frontend
- **Components**: Componentes React reutilizables
- **Services**: Comunicación con API
- **Types**: Definiciones TypeScript

## �📝 API Endpoints

### Documentos de Identidad
- `GET /api/DocumentoIdentidad` - Listar documentos activos
- `GET /api/DocumentoIdentidad/{id}` - Obtener por ID

### Beneficiarios
- `GET /api/Beneficiario` - Listar todos
- `GET /api/Beneficiario/{id}` - Obtener por ID
- `POST /api/Beneficiario` - Crear nuevo
- `PUT /api/Beneficiario/{id}` - Actualizar
- `DELETE /api/Beneficiario/{id}` - Eliminar

## 👨‍💻 Autor

**Josue Ayala**
- GitHub: [@Josueav09](https://github.com/Josueav09)

## 📄 Licencia

Este proyecto fue creado como parte de un reto técnico.
