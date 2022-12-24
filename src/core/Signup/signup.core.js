import React, { useState } from "react";
import { Navigate } from 'react-router-dom';

import { Container, Col, Row, Alert } from "reactstrap";

import { createUser, signin } from "../../api/users.api.js";
import { authenticate, isAuthenticated, isEmployee } from "../../functions/autentication.function.js";
import { createProduct } from "../../api/products.api";

export const SignUp = () => {

  const [values, setValues] = useState({
    dni_cliente: '',
    nombres: '',
    primer_apellido: '',
    segundo_apellido: '',
    direccion: '',
    fecha_nacimiento: '',
    email: '',
    clave: '',
    id_distrito: 80,
    error: '',
    loading: false,
    NavigateToReferrer: false
  });

  const {dni_cliente, nombres, primer_apellido, segundo_apellido, direccion, fecha_nacimiento, email, clave, id_distrito, loading, error, NavigateToReferrer} = values;
  const {user} = isAuthenticated();
  
  
  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true})
    createUser({dni_cliente, nombres, primer_apellido, segundo_apellido, direccion, fecha_nacimiento, email, clave, id_distrito})
      .then(data => {
        if (data.error) {
          setValues({...values, error: data.error, loading:false})
        } else {
          setValues({
            ...values,
            NavigateToReferrer: true
          })
        }
      })
  }

  const NavigateUser = () => {
    if(NavigateToReferrer) {
        return <Navigate replace to={`/`} />
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
          <Col className="mt-5 ms-5 d-inline-flex p-2 bd-highlight">
            <form>
              <a href="/">
                <h2>Atrás</h2>
              </a>
              <p className="titulo">Añadir un nuevo celular</p>
              <div className="flex-inline">
                <div className="mt-1 me-3">
                  <label className="etiqueta1">
                    Número de DNI:
                  </label>
                  <input
                    onChange={handleChange('dni_cliente')}
                    className="input_caja mt-1"
                    required
                    value={dni_cliente}
                  />
                </div>
                <div className="mt-1 me-3">
                  <label className="etiqueta1">
                    Nombres:
                  </label>
                  <input
                    onChange={handleChange('nombres')}
                    value={nombres}
                    className="input_caja mt-1"
                    required
                  />
                </div>
              </div>
              <div className="flex-inline">
                <div className="mt-1 me-3">
                  <label className="etiqueta1">
                    Primer Apellido:
                  </label>
                  <input
                    onChange={handleChange('primer_apellido')}
                    value={primer_apellido}
                    className="input_caja mt-1"
                    required
                  />
                </div>
                <div className="mt-1 me-3">
                  <label className="etiqueta1">
                    Segundo Apellido:
                  </label>
                  <input
                    onChange={handleChange('segundo_apellido')}
                    value={segundo_apellido}
                    className="input_caja mt-1"
                    required
                  />
                </div>
              </div>
              <div className="flex-inline">
                <div className="mt-1 me-3">
                  <label className="etiqueta1">
                    Dirección:
                  </label>
                  <input
                    onChange={handleChange('direccion')}
                    value={direccion}
                    className="input_caja mt-1"
                    required
                  />
                </div>
                <div className="mt-1 me-3">
                  <label className="etiqueta1">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    onChange={handleChange('fecha_nacimiento')}
                    value={fecha_nacimiento}
                    className="input_caja mt-1"
                    required
                  />
                </div>
              </div>
              <div className="flex-inline">
                <div className="mt-1 me-3">
                  <label className="etiqueta1">
                    Email:
                  </label>
                  <input
                    onChange={handleChange('email')}
                    value={email}
                    className="input_caja mt-1"
                    required
                  />
                </div>
                <div className="mt-1 me-3">
                  <label className="etiqueta1">
                    Contraseña:
                  </label>
                  <input
                    onChange={handleChange('clave')}
                    value={clave}
                    className="input_caja mt-1"
                    required
                  />
                </div>
              </div>

              <div className="flex-inline">
                <div className="mt-1">
                  <button
                    onClick={clickSubmit}
                    type="submit"
                    className="boton"
                  >
                    Crear
                  </button>
                </div>
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
