import React, { useState, useEffect } from "react";
import { Navigate, useParams } from 'react-router-dom';

import { Container, Col, Row, Alert } from "reactstrap";

import { getIdUser, isAuthenticated, isEmployee } from "../../functions/autentication.function.js";
import { buyProduct, createProduct, getProductById } from "../../api/products.api";
import { Card } from "../Home/home.core.js";

export const PayProduct = () => {

  let { Productid } = useParams()

  const [values, setValues] = useState({
    new_hora: '',
    new_fecha: '',
    dnicliente: '',
    idproducto: 0,
    modelo: '',
    imagen: '',
    error: '',
    loading: false,
    NavigateToReferrer: false
  });

  const value = () => {
    getProductById({id_producto_cel: Productid}).then((data) => {
      let modelo = data["MODELO"]
      let imagen = data["IMAGEN REFERENCIAL"]
      let hoy = new Date()
      let fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate()
      let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
      console.log(fecha)
      setValues({
        ...values,
        modelo: modelo,
        imagen: imagen,
        new_hora: hora,
        new_fecha: fecha,
        dnicliente: getIdUser(),
        idproducto: Productid,
      })
    });

    

  };

  useEffect(() => {
    value();
  }, []);

  console.log(values)

  const {new_hora, new_fecha, dnicliente, idproducto, loading, error, NavigateToReferrer} = values;
  const {user} = isAuthenticated();

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true})
    buyProduct({new_hora, new_fecha, dnicliente, idproducto})
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
      <Container className="mt-5">
        <Row>
          <Col className="mt-4 center p-2 bd-highlight">
            <h2>{values.modelo}</h2>
             <img src={values.imagen}/>
              <div className="mt-4">
                <button
                  onClick={clickSubmit}
                  type="submit"
                  className="boton"
                >
                  Confirmar Compra
                </button>
              </div>
          </Col>
        </Row>
      </Container>
      {showError()}
      {showLoading()}
      {NavigateUser()}
    </div>
  );
}
