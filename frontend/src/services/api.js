import axios from 'axios';

const api = axios.create({
  /**
   * hardcoded a baseURL para facilitar
   * o setup dos avaliadores do desafio.
   * 
   * Em outros contextos eu usaria
   * uma configuração isolada em um 
   * arquivo ou uma variável ambiente.
   */
  baseURL: 'http://localhost:3333/api',
});

export default api;
