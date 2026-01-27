import React from 'react';
import { Beneficiario } from '../types';

interface BeneficiarioTableProps {
    beneficiarios: Beneficiario[];
    onEdit: (beneficiario: Beneficiario) => void;
    onDelete: (id: number) => void;
}

export const BeneficiarioTable: React.FC<BeneficiarioTableProps> = ({
    beneficiarios,
    onEdit,
    onDelete,
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre Completo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo Documento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número Documento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha Nacimiento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sexo
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {beneficiarios.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                No hay beneficiarios registrados
                            </td>
                        </tr>
                    ) : (
                        beneficiarios.map((beneficiario) => (
                            <tr key={beneficiario.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {beneficiario.nombres} {beneficiario.apellidos}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {beneficiario.documentoIdentidadAbreviatura}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {beneficiario.numeroDocumento}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {formatDate(beneficiario.fechaNacimiento)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {beneficiario.sexo === 'M' ? 'Masculino' : 'Femenino'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(beneficiario)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('¿Está seguro de eliminar este beneficiario?')) {
                                                onDelete(beneficiario.id);
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
