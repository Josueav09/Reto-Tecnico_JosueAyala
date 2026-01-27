import React, { useEffect, useState } from 'react';
import { BeneficiarioForm } from './components/BeneficiarioForm';
import { BeneficiarioTable } from './components/BeneficiarioTable';
import { Beneficiario, CreateUpdateBeneficiario, DocumentoIdentidad } from './types';
import { beneficiarioService, documentoIdentidadService } from './services/api';
import './index.css';

function App() {
    const [beneficiarios, setBeneficiarios] = useState<Beneficiario[]>([]);
    const [documentos, setDocumentos] = useState<DocumentoIdentidad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [editingBeneficiario, setEditingBeneficiario] = useState<Beneficiario | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [beneficiariosData, documentosData] = await Promise.all([
                beneficiarioService.getAll(),
                documentoIdentidadService.getAll(),
            ]);
            console.log('📄 Documentos recibidos del backend:', documentosData);
            console.log('📄 Primer documento:', documentosData[0]);
            setBeneficiarios(beneficiariosData);
            setDocumentos(documentosData);
            setError(null);
        } catch (err) {
            console.error('❌ Error al cargar datos:', err);
            setError(err instanceof Error ? err.message : 'Error al cargar datos');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 5000);
    };

    const handleCreate = async (data: CreateUpdateBeneficiario) => {
        try {
            await beneficiarioService.create(data);
            await loadInitialData();
            setShowForm(false);
            showNotification('success', 'Beneficiario registrado exitosamente');
        } catch (err) {
            showNotification('error', err instanceof Error ? err.message : 'Error al registrar beneficiario');
            throw err;
        }
    };

    const handleUpdate = async (data: CreateUpdateBeneficiario) => {
        if (!editingBeneficiario) return;

        try {
            await beneficiarioService.update(editingBeneficiario.id, data);
            await loadInitialData();
            setShowForm(false);
            setEditingBeneficiario(null);
            showNotification('success', 'Beneficiario actualizado exitosamente');
        } catch (err) {
            showNotification('error', err instanceof Error ? err.message : 'Error al actualizar beneficiario');
            throw err;
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await beneficiarioService.delete(id);
            await loadInitialData();
            showNotification('success', 'Beneficiario eliminado exitosamente');
        } catch (err) {
            showNotification('error', err instanceof Error ? err.message : 'Error al eliminar beneficiario');
        }
    };

    const handleEdit = (beneficiario: Beneficiario) => {
        setEditingBeneficiario(beneficiario);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingBeneficiario(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Sistema de Gestión de Beneficiarios
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Administración de beneficiarios del programa social multi-país
                    </p>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Notificaciones */}
                {notification && (
                    <div
                        className={`mb-6 p-4 rounded-lg ${notification.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <p className="font-medium">{notification.message}</p>
                            <button
                                onClick={() => setNotification(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                        <p className="font-medium">Error: {error}</p>
                        <button
                            onClick={loadInitialData}
                            className="mt-2 text-sm underline hover:no-underline"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* Formulario o Botón de Nuevo */}
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    {!showForm ? (
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Beneficiarios Registrados</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Total: {beneficiarios.length} beneficiario{beneficiarios.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
                            >
                                + Nuevo Beneficiario
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                {editingBeneficiario ? 'Editar Beneficiario' : 'Registrar Nuevo Beneficiario'}
                            </h2>
                            <BeneficiarioForm
                                documentos={documentos}
                                initialData={editingBeneficiario ? {
                                    ...editingBeneficiario,
                                    fechaNacimiento: editingBeneficiario.fechaNacimiento.split('T')[0],
                                } : undefined}
                                onSubmit={editingBeneficiario ? handleUpdate : handleCreate}
                                onCancel={handleCancel}
                            />
                        </div>
                    )}
                </div>

                {/* Tabla */}
                {!showForm && (
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <BeneficiarioTable
                            beneficiarios={beneficiarios}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-12 bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        © 2026 PowerMas - Sistema de Gestión de Beneficiarios
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
