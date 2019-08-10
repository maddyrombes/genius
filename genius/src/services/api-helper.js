import axios from 'axios';
const data = require('../data/songs.jsonl')

const api = axios.create({
  baseURL: `http://localhost:3000/${data}`
})

export const fetchAllSongs = async () => {
  const data = await api.get('/');
  return data
}


