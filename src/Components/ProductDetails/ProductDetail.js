import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ProductDetail.css'
import { Container } from 'react-bootstrap'

function ProductDetail() {
    const { _id } = useParams()
    const [product, setProduct] = useState([])

    

    useEffect(()=> {
        (async() => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow',
                mode: 'cors'
            };
            if (_id) {
                const response = await fetch(`http://localhost:3000/item/items/${_id}`, requestOptions)
                if (response.status === 200) {
                    const result = await response.json()
                    setProduct(result)
                    console.log(result)
                }
            
            }
        })
        ()
    }, [ _id ])

    return (
        <div className='detail-body'>
            <Container>
                {
                    product &&
                    <div className='detail-card'>
                        <img src={product.image} alt="product" />
                        <div className='detail'>
                            <h3>{product.name} <span id='by'>by </span>{product.brand}</h3>
                            <p><span style={{color: "#111"}}>Category:</span>~{product.category}~</p>
                            <p className='description' style={{ color: "#555" }}><span style={{color: "#111"}}>Description:</span>{product.description}</p>
                            <p style={{ color: "green" }}><strong>Available</strong></p>
                            <p style={{color: "#111"}}>Price: <span style={{ color: "#555" }}><FontAwesomeIcon icon={faNairaSign} />{product.price}</span></p>
                            <button id={product.id} type='submit' className='edit-btn' >Edit Product</button>
                        </div>
                    </div>
                }
            </Container>
        </div>
    )
}

export default ProductDetail