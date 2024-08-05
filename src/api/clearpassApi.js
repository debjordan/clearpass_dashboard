import axios from 'axios';

const API_BASE_URL = 'https://clearpass.example.com/api'; // Substitua pelo URL da sua API ClearPass

const mockData = [
  { Year: 2020, Sector: 'Manutenção', Concessions: 120 },
  { Year: 2020, Sector: 'Almoxarifado', Concessions: 80 },
  { Year: 2021, Sector: 'Manutenção', Concessions: 150 },
  { Year: 2021, Sector: 'Almoxarifado', Concessions: 100 },
  { Year: 2022, Sector: 'Manutenção', Concessions: 200 },
  { Year: 2022, Sector: 'Almoxarifado', Concessions: 130 }
];

export const getClearPassData = async () => {
  try {
    return mockData;
  } catch (error) {
    console.error('Erro em obter os dados da API.', error);
    throw error;
  }
};
