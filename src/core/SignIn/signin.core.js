import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import "./signin.style.css"

import { Container, Col, Row, Alert } from "reactstrap";

import { signin } from "../../api/users.api.js";
import { authenticate, isAuthenticated } from "../../functions/autentication.function.js";

export const SignIn = () => {

  const [values, setValues] = useState({
    dni_cliente: '',
    clave: '',
    error: '',
    loading: false,
    NavigateToReferrer: false
  });

  const {dni_cliente, clave, loading, error, NavigateToReferrer} = values;
  const {user} = isAuthenticated();
  
  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true})
    signin({dni_cliente, clave})
      .then(data => {
        if (data.error) {
          setValues({...values, error: data.error, loading:false})
        } else {
          authenticate(
            data, () => {
              setValues({
                ...values,
                NavigateToReferrer: true
              })
            }
          )
        }
      })
  }

  const NavigateUser = () => {
    if(NavigateToReferrer) {
      if (user) {
        return <Navigate replace to={`/`} />
      }
    }
    if(isAuthenticated()) {
      if (user) {
        return <Navigate replace to={`/`} />
      }
    }
  }

  const showError = () => (
    error && (<div className="mt-4 text-center">
      <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Alert color="danger">
              {error}
            </Alert>
          </Col>
      </Row>
    </div>)
  )

  const showLoading = () => (
    loading && (
      <div className="alert alert-info text-center">
        <h2>Cargando...</h2>
      </div>
    )
  )

  return (
    <div>
      <Container className="contenedor mt-5">
        <Row>
          <Col className="mt-4 ms-5 d-inline-flex p-2 bd-highlight">
            <form>
              <a href="/">
                <h2>{"<< Atrás"}</h2>
              </a>
              <p className="titulo">BIENVENIDO DE NUEVO</p>
              <div>
                No tengo una cuenta,
                <a href="/signup">Registrarme</a>
              </div>
              <div>
                No soy un cliente,
                <a href="/signin/empleado">Iniciar Sesion como Empleado</a>
              </div>
              <div className="mt-3">
                <label htmlFor="dni_cliente" className="etiqueta">
                  DNI
                </label>
                <input
                  onChange={handleChange('dni_cliente')}
                  className="input_caja mt-1"
                  id="correo"
                  required
                  placeholder="00000000"
                  value={dni_cliente}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="contrasena" className="etiqueta">
                  Contraseña
                </label>
                <input
                  onChange={handleChange('clave')}
                  value={clave}
                  type="password"
                  className="input_caja mt-1"
                  id="contrasena"
                  required
                  placeholder="●●●●●●●●●●"
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={clickSubmit}
                  type="submit"
                  className="boton"
                >
                  Iniciar
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      {showError()}
      {showLoading()}
      {NavigateUser()}
    </div>
  );
}
