import React from 'react';

/**
 * Componentes de ejemplo usando la Paleta Azul Corporativo Moderno
 * Puedes copiar y adaptar estos para tus necesidades
 */

// Badge / Etiqueta
export const Badge: React.FC<{ 
  variant?: 'primary' | 'success' | 'warning' | 'error'; 
  children: React.ReactNode 
}> = ({ variant = 'primary', children }) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success bg-opacity-10 text-success',
    warning: 'bg-warning bg-opacity-10 text-warning',
    error: 'bg-error bg-opacity-10 text-error',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Alert / Alerta
export const Alert: React.FC<{
  variant?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}> = ({ variant = 'info', title, children, onClose }) => {
  const variants = {
    info: 'bg-primary-50 border-l-4 border-primary-600 text-primary-900',
    success: 'bg-success bg-opacity-5 border-l-4 border-success text-success',
    warning: 'bg-warning bg-opacity-5 border-l-4 border-warning text-warning',
    error: 'bg-error bg-opacity-5 border-l-4 border-error text-error',
  };
  
  return (
    <div className={`p-4 rounded-lg ${variants[variant]}`}>
      <div className="flex justify-between items-start">
        <div>
          {title && <h3 className="font-bold mb-1">{title}</h3>}
          <p className="text-sm">{children}</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

// Card / Tarjeta
export const Card: React.FC<{ 
  title?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {title && (
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-bold text-primary-900">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// Input con Etiqueta
export const FormField: React.FC<{
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}> = ({ label, error, required, children }) => {
  return (
    <div>
      <label className="label-field">
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      {children}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

// Breadcrumb / Migas de Pan
export const Breadcrumb: React.FC<{ 
  items: Array<{ label: string; href?: string; active?: boolean }> 
}> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.href ? (
            <a 
              href={item.href}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {item.label}
            </a>
          ) : (
            <span className={item.active ? 'text-gray-900 font-bold' : 'text-gray-600'}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// Loading Spinner
export const Spinner: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}> = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-primary-600 ${sizes[size]}`} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
};

// Status Indicator / Indicador de Estado
export const StatusIndicator: React.FC<{
  status: 'active' | 'inactive' | 'pending' | 'error';
  label?: string;
}> = ({ status, label }) => {
  const statusColors = {
    active: 'bg-success text-success',
    inactive: 'bg-gray-300 text-gray-600',
    pending: 'bg-warning text-warning',
    error: 'bg-error text-error',
  };
  
  const statusLabels = {
    active: 'Activo',
    inactive: 'Inactivo',
    pending: 'Pendiente',
    error: 'Error',
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
      <span className={`text-sm font-medium ${statusColors[status]}`}>
        {label || statusLabels[status]}
      </span>
    </div>
  );
};

// Pagination / Paginación
export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-secondary disabled:opacity-50"
      >
        ← Anterior
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded font-medium transition-colors ${
            page === currentPage
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-secondary disabled:opacity-50"
      >
        Siguiente →
      </button>
    </div>
  );
};

// Example Usage (Ejemplo de uso):
/*
export function ExamplePage() {
  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[
        { label: 'Inicio', href: '/' },
        { label: 'Beneficiarios', active: true }
      ]} />
      
      <Alert variant="success" title="Éxito" onClose={() => {}}>
        Beneficiario registrado correctamente
      </Alert>
      
      <Card title="Información del Usuario">
        <div className="space-y-4">
          <FormField label="Nombres" required>
            <input type="text" className="input-field" />
          </FormField>
          
          <div className="flex gap-2">
            <Badge variant="primary">Activo</Badge>
            <StatusIndicator status="active" />
          </div>
        </div>
      </Card>
      
      <Pagination currentPage={1} totalPages={5} onPageChange={(p) => console.log(p)} />
    </div>
  );
}
*/
