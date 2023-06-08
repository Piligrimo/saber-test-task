import axios from 'axios';

const local = true;

export default axios.create({
  baseURL: local ? 'http://localhost:3000' : 'https://my-json-server.typicode.com/Piligrimo/fake-backend',
  timeout: 6000,
});
