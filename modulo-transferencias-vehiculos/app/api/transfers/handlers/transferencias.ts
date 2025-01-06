

import { transferenciasMock } from '@api/transfers/mock';
import { Transferencia } from 'app/types';


// Obtener todas las transferencias
export const getTransferencias = async (): Promise<Transferencia[]> => {
    return Promise.resolve(transferenciasMock);
}; 

// Consultar una transferencia por ID
export const getTransferenciaById = async (id: number): Promise<Transferencia> => {
    const transferencia = transferenciasMock.find((item) => item.id === id);
    if (transferencia) {
        return Promise.resolve(transferencia);
    }
    return Promise.reject(new Error('Transferencia no encontrada'));
};

// Agregar una nueva transferencia
let currentId = transferenciasMock.length ? Math.max(...transferenciasMock.map((t) => t.id)) + 1 : 1;

export const addTransferencia = async (
    transferencia: Omit<Transferencia, 'id'>
): Promise<Transferencia> => {
    const newTransferencia: Transferencia = {
        id: currentId++, // Incrementa el ID
        ...transferencia,
        created_at: new Date().toISOString(),
    };
    transferenciasMock.push(newTransferencia);
    return newTransferencia;
}


//Editar una transferencia
export const updateTransferencia = async (
    id: number,
    updatedData: Partial<Transferencia>
): Promise<Transferencia> => {
    
    const index = transferenciasMock.findIndex((item) => item.id === id);
    if (index > -1) {
        transferenciasMock[index] = { ...transferenciasMock[index], ...updatedData };
        return Promise.resolve(transferenciasMock[index]);
    }
    return Promise.reject(new Error('Transferencia no encontrada'));
};
// Eliminar una transferencia
export const deleteTransferencia = async (id: number): Promise<Transferencia> => {
    const index = transferenciasMock.findIndex((item) => item.id === id);
    if (index > -1) {
        const removed = transferenciasMock.splice(index, 1);
        return Promise.resolve(removed[0]); // Devuelve la transferencia eliminada
    }
    return Promise.reject(new Error('Transferencia no encontrada'));
};