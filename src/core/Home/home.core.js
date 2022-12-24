import React, { useEffect, useState } from "react";
import {TiChevronLeftOutline, TiChevronRightOutline} from 'https://cdn.skypack.dev/react-icons/ti';
import { Button } from "reactstrap";
import { listPlanes, listProducts } from "../../api/products.api.js"

import "./home.style.css"
import { isAuthenticated, isEmployee } from "../../functions/autentication.function.js";
import Header from "../../Components/Header/header.component.js";

const MAX_VISIBILITY = 2;

export const Card = ({title, id, imagen}) => {
  if(!isAuthenticated()) {
    return (
      <div className='card'>
        <h2>{title}</h2>
        <img src={imagen}/>
        <div>
        <Button href={`/signin`} color="primary">
          Comprar
        </Button>
        </div>
      </div>
    );
  } else if (isEmployee()) {
    return (
      <div className='card'>
        <h2>{title}</h2>
        <img src={imagen}/>
      </div>
    );
  } else {
    return (
      <div className='card'>
        <h2>{title}</h2>
        <img src={imagen}/>
        <div>
        <Button href={`/product/buy/${id}`} color="primary">
          Comprar
        </Button>
        </div>
      </div>
    );
  }
}

const Carousel = ({children}) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  
  return (
    <div className='carousel'>
      {active > 0 && <button className='nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline/></button>}
      {React.Children.map(children, (child, i) => (
        <div className='card-container' style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointer-events': active === i ? 'auto' : 'none',
            'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}>
          {child}
        </div>
      ))}
      {active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline/></button>}
    </div>
  );
};
const Carousel2 = ({children}) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  
  return (
    <div className='carousel2'>
      {active > 0 && <button className='nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline/></button>}
      {React.Children.map(children, (child, i) => (
        <div className='card-container' style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointer-events': active === i ? 'auto' : 'none',
            'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          }}>
          {child}
        </div>
      ))}
      {active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline/></button>}
    </div>
  );
};

export const Home = () => {

  const [product, setProduct] = useState([]);
  const [planes, setPlanes] = useState([]);

  const products = () => {
    listProducts().then((data) => {
      let a = data
      setProduct(a)
    })
    listPlanes().then((data) => {
      let a = data
      setPlanes(a)
    })
  }

  useEffect(() => {
    products()
  }, [])

  
  const CARDS = product.length;
  const CARDS2 = planes.length;
  console.log(product)

  return (
    <div className='app'>
      <Header></Header>
      <Carousel>
        {[...new Array(CARDS)].map((p, i) => (
          <Card title={product[i].modelo} id={product[i].id_producto} imagen={product[i].imagen}/>
        ))}
      </Carousel>
      <Carousel2>
        {[...new Array(CARDS2)].map((p, i) => (
          <div className='card2'>
            <h2>{planes[i].nombre}</h2>
            <p>{planes[i].descripcion}</p>
            <div>
              <p>Gigas: {planes[i].gigas} Minutos: {planes[i].minutos} Mensajes: {planes[i].mensajes}</p>
            </div>
          </div>
        ))}
      </Carousel2>
    </div>
  )
}