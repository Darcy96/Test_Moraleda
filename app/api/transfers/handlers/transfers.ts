import { transfersMock } from '@api/transfers/mock';
import { Transferencia } from 'app/types';

/**
 * 🌐 Transfer Management API
 *
 * This module provides utility functions to manage "transferencias" (transfers),
 * including fetching, adding, updating, and deleting transfer records.
 */

// 📜 Get all transfers
export const getTransfers = async (): Promise<Transferencia[]> => {
    // Simulates fetching all transfer records
    return Promise.resolve(transfersMock);
};

// 🔍 Get a transfer by ID
export const getTransferById = async (id: number): Promise<Transferencia> => {
    // Finds a transfer record by its ID
    const transferencia = transfersMock.find((item) => item.id === id);
    if (transferencia) {
        return Promise.resolve(transferencia);
    }
    return Promise.reject(new Error('Transferencia no encontrada')); // Returns an error if not found
};

// ➕ Add a new transfer
let currentId = transfersMock.length ? Math.max(...transfersMock.map((t) => t.id)) + 1 : 1;

export const addTransfer = async (
    transferencia: Omit<Transferencia, 'id'> // Excludes `id` from the input
): Promise<Transferencia> => {
    const newTransferencia: Transferencia = {
        id: currentId++, // Generates a new unique ID
        ...transferencia,
        created_at: new Date().toISOString(), // Adds a timestamp
    };
    transfersMock.push(newTransferencia); // Adds the new transfer to the mock data
    return newTransferencia;
};

// ✏️ Update an existing transfer
export const updateTransfer = async (
    id: number,
    updatedData: Partial<Transferencia> // Allows partial updates
): Promise<Transferencia> => {
    const index = transfersMock.findIndex((item) => item.id === id);
    if (index > -1) {
        transfersMock[index] = { ...transfersMock[index], ...updatedData }; // Merges updated data
        return Promise.resolve(transfersMock[index]);
    }
    return Promise.reject(new Error('Transferencia no encontrada')); // Returns an error if not found
};

// ❌ Delete a transfer
export const deleteTransfer = async (id: number): Promise<Transferencia> => {
    const index = transfersMock.findIndex((item) => item.id === id);
    if (index > -1) {
        const removed = transfersMock.splice(index, 1); // Removes the transfer from the mock data
        return Promise.resolve(removed[0]); // Returns the deleted transfer
    }
    return Promise.reject(new Error('Transferencia no encontrada')); // Returns an error if not found
};
