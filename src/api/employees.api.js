import { API } from "./api.js";

export const signin = user => {
  return fetch(`${API}/empleados/validar`, {
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