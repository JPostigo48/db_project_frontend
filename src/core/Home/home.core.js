import React, { useEffect, useState } from "react";
import {TiChevronLeftOutline, TiChevronRightOutline} from 'https://cdn.skypack.dev/react-icons/ti';
import { Button } from "reactstrap";
import { listProducts } from "../../api/products.api.js"

import "./home.style.css"
import { isAuthenticated, isEmployee } from "../../functions/autentication.function.js";

const MAX_VISIBILITY = 2;

const Card = ({title, i}) => (
  <div className='card'>
    <h2>{title}</h2>
    <img src={`https://drive.google.com/uc?export=download&id=1mhPXg1Yc1ORjb-WgAtjIb4Fv3rPj9mlN`}/>
    <div>
    <Button color="primary">
      Comprar
    </Button>
    </div>
  </div>
);

const quit = () => {
  if (isAuthenticated()) {
    return (
      <a href="/signout">Salir</a>
    )
  }
  else {
    return (<a href="/signin">Ingresar</a>)
  }
}

const add = () => {
  if (isEmployee()) {
    return (
      <a href="/productos/add">Añadir</a>
    )
  }
  else {
    return (<div></div>)
  }
}

const Carousel = ({children}) => {
  const [active, setActive] = useState(2);
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

export const Home = () => {

  const [product, setProduct] = useState([]);

  const products = () => {
    listProducts().then((data) => {
      let a = data
      setProduct(a)
    })
  }

  useEffect(() => {
    products()
  }, [])

  
  const CARDS = product.length;

  return (
    <div className='app'>
      {quit()}
      <Carousel>
        {[...new Array(CARDS)].map((p, i) => (
          <Card title={product[i].modelo} i={i}/>
        ))}
      </Carousel>
      {add()}
    </div>
  )
}