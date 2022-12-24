import React, { Component, useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { getDoubts } from '../../api/users.api';
import { getIdUser } from '../../functions/autentication.function';
 
const rows = (a) => {
  if (a.length !== 0) {
    console.log("mayoooor")
    return (
      a[0].map((index, i) => {
        console.log(index)
        return (
          <tr>
          <td>{index["ID CONSULTA"]}</td>
          <td>{index.ASUNTO}</td>
          <td>{index.DESCRIPCION}</td>
          <td>{index.ESTADO}</td>
        </tr>
      )
    })
    )
  }
}
 
class Tabla extends Component {
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>ID Consulta</th>
            <th>Asunto</th>
            <th>Descripción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {rows(this.props.data)}
        </tbody>
      </Table>
    );
  }
}

export const Doubts = () => {
  const [values, setValues] = useState([])
  
  const value = () => {
    const dni = getIdUser()
    getDoubts({"dni_cliente": dni}).then((data) => {
      let a = data
      setValues(a)
    })
  }

  useEffect(() => {
    value()
  }, [])

  console.log(values)

  return (
    <div>
      <a href="/">
        <h2>Atrás</h2>
      </a>
      <Tabla data={values} />
    </div>
  )
} 