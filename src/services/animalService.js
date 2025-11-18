import api from './api';

// Buscar todos os animais
export const getAllAnimals = async () => {
    const response = await api.get('/api/animals');
    return response.data;
};


export const createAnimal = async (animalData) => {
    const response = await api.post('/api/animals', animalData);
    return response.data;
};


export const deleteAnimal = async (id) => {
    await api.delete(`/api/animals/${id}`);
};


export const updateAnimalStatus = async (id, status) => {

    const response = await api.put(`/api/animals/${id}`, { status }); 
    return response.data;
};