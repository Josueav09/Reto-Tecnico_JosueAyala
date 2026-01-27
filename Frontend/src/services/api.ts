import axios from 'axios';
import { Beneficiario, CreateUpdateBeneficiario, DocumentoIdentidad } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const message = error.response.data?.message || 'Error en la operación';
            throw new Error(message);
        }
        throw new Error('Error de conexión con el servidor');
    }
);

export const documentoIdentidadService = {
    getAll: async (): Promise<DocumentoIdentidad[]> => {
        const response = await api.get<DocumentoIdentidad[]>('/DocumentoIdentidad');
        return response.data;
    },

    getById: async (id: number): Promise<DocumentoIdentidad> => {
        const response = await api.get<DocumentoIdentidad>(`/DocumentoIdentidad/${id}`);
        return response.data;
    },
};

export const beneficiarioService = {
    getAll: async (): Promise<Beneficiario[]> => {
        const response = await api.get<Beneficiario[]>('/Beneficiario');
        return response.data;
    },

    getById: async (id: number): Promise<Beneficiario> => {
        const response = await api.get<Beneficiario>(`/Beneficiario/${id}`);
        return response.data;
    },

    create: async (beneficiario: CreateUpdateBeneficiario): Promise<Beneficiario> => {
        const response = await api.post<Beneficiario>('/Beneficiario', beneficiario);
        return response.data;
    },

    update: async (id: number, beneficiario: CreateUpdateBeneficiario): Promise<Beneficiario> => {
        const response = await api.put<Beneficiario>(`/Beneficiario/${id}`, beneficiario);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/Beneficiario/${id}`);
    },
};
