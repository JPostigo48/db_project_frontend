import React, { useState } from "react";
import { Navigate } from 'react-router-dom';

import { Container, Col, Row, Alert } from "reactstrap";

import { signin } from "../../api/users.api.js";
import { authenticate, isAuthenticated, isEmployee } from "../../functions/autentication.function.js";
import { createProduct } from "../../api/products.api";

export const ProductCreate = () => {

  const [values, setValues] = useState({
    precio: '',
    stock: '',
    modelo: '',
    imagen: '',
    error: '',
    loading: false,
    NavigateToReferrer: false
  });

  const {precio, stock, modelo, imagen, loading, error, NavigateToReferrer} = values;
  const {user} = isAuthenticated();
  
  
  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true})
    createProduct({precio, stock, modelo, imagen})
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
      if (user) {
        return <Navigate replace to={`/`} />
      }
    }
    if(!isAuthenticated()) {
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
                <h2>Atrás</h2>
              </a>
              <p className="titulo">Añadir un nuevo celular</p>
              <div className="mt-3">
                <label className="etiqueta">
                  Precio
                </label>
                <input
                  onChange={handleChange('precio')}
                  className="input_caja mt-1"
                  required
                  placeholder="00.00"
                  value={precio}
                />
              </div>
              <div className="mt-3">
                <label className="etiqueta">
                  Stock
                </label>
                <input
                  onChange={handleChange('stock')}
                  value={stock}
                  className="input_caja mt-1"
                  required
                />
              </div>
              <div className="mt-3">
                <label className="etiqueta">
                  Modelo
                </label>
                <input
                  onChange={handleChange('modelo')}
                  value={modelo}
                  className="input_caja mt-1"
                  required
                />
              </div>
              <div className="mt-3">
                <label className="etiqueta">
                  Imagen
                </label>
                <input
                  onChange={handleChange('imagen')}
                  value={imagen}
                  className="input_caja mt-1"
                  required
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={clickSubmit}
                  type="submit"
                  className="boton"
                >
                  Crear
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
