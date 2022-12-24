export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
}

export const isAuthenticated = () => {
  if(typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    if (JSON.parse(localStorage.getItem('jwt')).domain === 'EPCC') {
      return JSON.parse(localStorage.getItem('jwt'));
      // return localStorage.getItem('jwt')
    }
    return false;
  }
    return false;
}

export const isEmployee = () => {
  if(typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    console.log(JSON.parse(localStorage.getItem('jwt')).user.CARGO)
    if (JSON.parse(localStorage.getItem('jwt')).user.CARGO !== 3 ) {
      return true;
      // return localStorage.getItem('jwt')
    }
    return false;
  }
    return false;
}

export const getIdUser = () => {
  if(typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt')).user.dni_cliente;
  }
    return false;
}