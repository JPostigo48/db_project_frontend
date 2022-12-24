import { API } from "./api.js";

export const listProducts = () => {
  return fetch(`${API}/productos/lista`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
    mode: 'cors',
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};

export const listPlanes = () => {
  return fetch(`${API}/planes/lista`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
    mode: 'cors',
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};

export const getProductById = user => {
  return fetch(`${API}/productos/celular`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    mode: 'cors',
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};

export const createProduct = user => {
  return fetch(`${API}/productos/nuevo/celular`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    mode: 'cors',
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};

export const buyProduct = user => {
  return fetch(`${API}/productos/celular/compra`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    mode: 'cors',
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    })
};