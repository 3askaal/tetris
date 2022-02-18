export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://b0mberman-server.herokuapp.com/'
    : 'http://localhost:1337'


export const SOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://b0mberman-server.herokuapp.com/'
    : 'http://localhost:1337'
