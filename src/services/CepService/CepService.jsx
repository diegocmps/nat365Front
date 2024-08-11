import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cep.awesomeapi.com.br/json'
});

export const getCepData = async (cep) => {
  try {
    const response = await api.get(`/${cep}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do CEP:", error);
    throw error;
  }
};
