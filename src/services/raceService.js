import api from './api';


export const getRacesBySpecie = async (specieId) => {
    const response = await api.get(`/api/species/${specieId}/races`);
    return response.data;
};


export const createRace = async (specieId, name) => {
    const response = await api.post(`/api/species/${specieId}/races`, { name });
    return response.data;
};


export const deleteRace = async (specieId, raceId) => {
    await api.delete(`/api/species/${specieId}/races/${raceId}`);
};