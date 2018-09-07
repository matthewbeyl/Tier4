import axios from 'axios';

export function callLogin() {
  

  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/auth/login',config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

export function callLogout() {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  };

  return axios.get('/api/auth/logout', config)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}
