import React, { useEffect, useState } from 'react';
import { CreateUpdateBeneficiario, DocumentoIdentidad } from '../types';

interface BeneficiarioFormProps {
    documentos: DocumentoIdentidad[];
    initialData?: CreateUpdateBeneficiario & { id?: number };
    onSubmit: (data: CreateUpdateBeneficiario) => Promise<void>;
    onCancel: () => void;
}

export const BeneficiarioForm: React.FC<BeneficiarioFormProps> = ({
    documentos,
    initialData,
    onSubmit,
    onCancel,
}) => {
    const [formData, setFormData] = useState<CreateUpdateBeneficiario>({
        nombres: initialData?.nombres || '',
        apellidos: initialData?.apellidos || '',
        documentoIdentidadId: initialData?.documentoIdentidadId || 0,
        numeroDocumento: initialData?.numeroDocumento || '',
        fechaNacimiento: initialData?.fechaNacimiento || '',
        sexo: initialData?.sexo || 'M',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDocumento, setSelectedDocumento] = useState<DocumentoIdentidad | null>(null);

    // Debug: Log documentos recibidos
    useEffect(() => {
        console.log('🔍 BeneficiarioForm - Documentos recibidos:', documentos);
        console.log('🔍 BeneficiarioForm - Cantidad de documentos:', documentos.length);
        if (documentos.length > 0) {
            console.log('🔍 BeneficiarioForm - Primer documento:', documentos[0]);
        }
    }, [documentos]);

    // Actualizar documento seleccionado cuando cambia el tipo
    useEffect(() => {
        if (formData.documentoIdentidadId > 0) {
            const documento = documentos.find(d => d.id === formData.documentoIdentidadId);
            setSelectedDocumento(documento || null);

            // Limpiar el número de documento al cambiar de tipo
            if (documento && formData.numeroDocumento) {
                validateNumeroDocumento(formData.numeroDocumento, documento);
            }
        } else {
            setSelectedDocumento(null);
        }
    }, [formData.documentoIdentidadId, documentos]);

    // Validación dinámica del número de documento
    const validateNumeroDocumento = (value: string, documento: DocumentoIdentidad): string | null => {
        if (!value) {
            return 'El número de documento es obligatorio';
        }

        // Validar solo números si es requerido
        if (documento.soloNumeros && !/^\d+$/.test(value)) {
            return `El ${documento.nombre} solo acepta números`;
        }

        // Validar longitud exacta
        if (value.length !== documento.longitud) {
            return `El ${documento.nombre} debe tener exactamente ${documento.longitud} caracteres`;
        }

        return null;
    };

    const handleInputChange = (field: keyof CreateUpdateBeneficiario, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleNumeroDocumentoChange = (value: string) => {
        if (!selectedDocumento) {
            handleInputChange('numeroDocumento', value);
            return;
        }

        // Si solo acepta números, filtrar caracteres no numéricos
        let filteredValue = value;
        if (selectedDocumento.soloNumeros) {
            filteredValue = value.replace(/\D/g, '');
        }

        // Limitar a la longitud máxima
        if (filteredValue.length <= selectedDocumento.longitud) {
            handleInputChange('numeroDocumento', filteredValue);

            // Validar en tiempo real
            const error = validateNumeroDocumento(filteredValue, selectedDocumento);
            if (error) {
                setErrors(prev => ({ ...prev, numeroDocumento: error }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.numeroDocumento;
                    return newErrors;
                });
            }
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.nombres.trim()) {
            newErrors.nombres = 'Los nombres son obligatorios';
        }

        if (!formData.apellidos.trim()) {
            newErrors.apellidos = 'Los apellidos son obligatorios';
        }

        if (formData.documentoIdentidadId === 0) {
            newErrors.documentoIdentidadId = 'Debe seleccionar un tipo de documento';
        }

        if (selectedDocumento) {
            const documentoError = validateNumeroDocumento(formData.numeroDocumento, selectedDocumento);
            if (documentoError) {
                newErrors.numeroDocumento = documentoError;
            }
        }

        if (!formData.fechaNacimiento) {
            newErrors.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
        } else {
            const fechaNac = new Date(formData.fechaNacimiento);
            const hoy = new Date();
            if (fechaNac > hoy) {
                newErrors.fechaNacimiento = 'La fecha de nacimiento no puede ser futura';
            }
        }

        if (!formData.sexo) {
            newErrors.sexo = 'El sexo es obligatorio';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombres */}
                <div>
                    <label htmlFor="nombres" className="label-field">
                        Nombres *
                    </label>
                    <input
                        type="text"
                        id="nombres"
                        value={formData.nombres}
                        onChange={(e) => handleInputChange('nombres', e.target.value)}
                        className={`input-field ${errors.nombres ? 'error' : ''}`}
                        placeholder="Ingrese los nombres"
                    />
                    {errors.nombres && (
                        <p className="error-message">{errors.nombres}</p>
                    )}
                </div>

                {/* Apellidos */}
                <div>
                    <label htmlFor="apellidos" className="label-field">
                        Apellidos *
                    </label>
                    <input
                        type="text"
                        id="apellidos"
                        value={formData.apellidos}
                        onChange={(e) => handleInputChange('apellidos', e.target.value)}
                        className={`input-field ${errors.apellidos ? 'error' : ''}`}
                        placeholder="Ingrese los apellidos"
                    />
                    {errors.apellidos && (
                        <p className="error-message">{errors.apellidos}</p>
                    )}
                </div>

                {/* Tipo de Documento */}
                <div>
                    <label htmlFor="documentoIdentidadId" className="label-field">
                        Tipo de Documento *
                    </label>
                    <select
                        id="documentoIdentidadId"
                        value={formData.documentoIdentidadId}
                        onChange={(e) => {
                            handleInputChange('documentoIdentidadId', parseInt(e.target.value));
                            handleInputChange('numeroDocumento', ''); // Limpiar número al cambiar tipo
                        }}
                        className={`input-field ${errors.documentoIdentidadId ? 'error' : ''}`}
                    >
                        <option value={0}>Seleccione un tipo de documento</option>
                        {documentos.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                                {doc.nombre} ({doc.abreviatura}) - {doc.pais}
                            </option>
                        ))}
                    </select>
                    {errors.documentoIdentidadId && (
                        <p className="error-message">{errors.documentoIdentidadId}</p>
                    )}
                </div>

                {/* Número de Documento con Validación Dinámica */}
                <div>
                    <label htmlFor="numeroDocumento" className="label-field">
                        Número de Documento *
                    </label>
                    <input
                        type="text"
                        id="numeroDocumento"
                        value={formData.numeroDocumento}
                        onChange={(e) => handleNumeroDocumentoChange(e.target.value)}
                        disabled={!selectedDocumento}
                        className={`input-field ${errors.numeroDocumento ? 'error' : ''}`}
                        placeholder={
                            selectedDocumento
                                ? `Ingrese ${selectedDocumento.longitud} ${selectedDocumento.soloNumeros ? 'dígitos' : 'caracteres'}`
                                : 'Seleccione primero un tipo de documento'
                        }
                    />
                    {selectedDocumento && (
                        <div className="mt-1 text-xs text-gray-600">
                            <p>
                                ✓ Longitud requerida: {selectedDocumento.longitud} caracteres (actual: {formData.numeroDocumento.length})
                            </p>
                            <p>
                                ✓ Formato: {selectedDocumento.soloNumeros ? 'Solo números' : 'Alfanumérico'}
                            </p>
                        </div>
                    )}
                    {errors.numeroDocumento && (
                        <p className="error-message">{errors.numeroDocumento}</p>
                    )}
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                    <label htmlFor="fechaNacimiento" className="label-field">
                        Fecha de Nacimiento *
                    </label>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className={`input-field ${errors.fechaNacimiento ? 'error' : ''}`}
                    />
                    {errors.fechaNacimiento && (
                        <p className="error-message">{errors.fechaNacimiento}</p>
                    )}
                </div>

                {/* Sexo */}
                <div>
                    <label className="label-field">
                        Sexo *
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="M"
                                checked={formData.sexo === 'M'}
                                onChange={(e) => handleInputChange('sexo', e.target.value)}
                                className="mr-2 w-4 h-4 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">Masculino</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="F"
                                checked={formData.sexo === 'F'}
                                onChange={(e) => handleInputChange('sexo', e.target.value)}
                                className="mr-2 w-4 h-4 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">Femenino</span>
                        </label>
                    </div>
                    {errors.sexo && (
                        <p className="error-message">{errors.sexo}</p>
                    )}
                </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="btn-secondary disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Registrar'}
                </button>
            </div>
        </form>
    );
};
