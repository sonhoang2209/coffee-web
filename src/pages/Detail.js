import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { FormControl, InputGroup, Card, Row, Col, Button } from 'react-bootstrap';

import { useLocation } from 'react-router-dom';
import { useViewport } from "../components/Functions";

import NotesIcon from '@material-ui/icons/Notes';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addOneCart } from '../reducers/cartReducer';


export default function Detail() {
    const { state } = useLocation();
    const { data } = state;
    const check = useViewport()
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);
    const [priceDetail, setPriceDetail] = useState(data?.price)
    const [quantity, setQuantity] = useState(1)
    // const [size, setSize] = useState({})
    const [total, setTotal] = useState(0)
    const [values, setValues] = React.useState({...data,
        quantity: quantity
    });
    useEffect(() => {
        setPriceDetail(data?.price)
        setTotal(priceDetail * quantity)
        quantity === 1 ? setLoading(true) : setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    

    const handleChange = (value) => (event) => {
        setQuantity(value)
        setValues({ ...values, quantity: value })
        // console.log(values)
    };

    const update = () => {
        dispatch(addOneCart({values}));
        navigate(`/`)
    };

    return (
        <div>
            <Header />
            <div className={check ? "container-main top-60 default" : "main top-60 default"}>
                <div className={check ? "block-product block-maxsize" : "block-product"}>
                    <div className='main-product-detail'>
                        <Row>
                            <Col xs={12} md={6}>
                                <div className='product-thumbnail'>
                                    <Card.Img variant="top" src={data.thumbnail} style={{ borderRadius: 5 }} />
                                    <p style={{ textAlign: 'center' }}>{data.description}</p>
                                </div>
                            </Col>
                            <Col xs={12} md={6}>
                                <h3 className='product-title'>{data.name}</h3>
                                <div className='block block-price'>
                                    <p className='price'>{data.price.toLocaleString('en-US')}đ</p>
                                    <div className='quantity block'>
                                        <Button
                                            disabled={isLoading}
                                            variant="warning"
                                            onClick={handleChange(quantity - 1)}
                                            style={{ borderRadius: 20, color: '#fff', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                                        >
                                            <RemoveIcon />
                                        </Button>
                                        <p className='quantity-numb'>{quantity}</p>
                                        <Button
                                            variant="warning"
                                            style={{ borderRadius: 20, color: '#fff', width: 30, height: 30, justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                                            onClick={handleChange(quantity + 1)}
                                        >
                                            <AddOutlinedIcon />
                                        </Button>
                                    </div>
                                </div>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text><NotesIcon /></InputGroup.Text>
                                    <FormControl placeholder='Ghi chú thêm cho món này' />
                                </InputGroup>
                                <div className='card-product-options'>
                                    {
                                        data.options.map((value, index) => {
                                            return (
                                                <section key={index} className='card-product-option'>
                                                    <div className='card-product-option-title'>
                                                        <span className="card-product-option-text">CHỌN {value.name} ({value.description})</span>
                                                    </div>
                                                    <div className='card-product-option-value block'>
                                                        {
                                                            value.group_id === 0 ? value.items.map((item, i) => {
                                                                return (
                                                                    <div key={i} className="form-check">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="flexRadioDefault"
                                                                            id="flexRadioDefault2"
                                                                            defaultChecked={i === 0 && true}
                                                                            disabled
                                                                        />
                                                                        <div className='check-label'>
                                                                            <label className="form-check-label">
                                                                                {item.name}
                                                                            </label>
                                                                            <label className="form-check-label">
                                                                                + {item.price.toLocaleString('en-US')}đ
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                )
                                                            })
                                                                : value.items.map((item, i) => {
                                                                    return (
                                                                        <div key={i} className="form-check">
                                                                            <input
                                                                                className="form-check-input"
                                                                                type="checkbox"
                                                                                name="flexRadioDefault"
                                                                                id="flexRadioDefault2"
                                                                                disabled
                                                                            />
                                                                            <div className='check-label'>
                                                                                <label className="form-check-label">
                                                                                    {item.name}
                                                                                </label>
                                                                                <label className="form-check-label">
                                                                                    + {item.price.toLocaleString('en-US')}đ
                                                                                </label>
                                                                            </div>
                                                                        </div>

                                                                    )
                                                                })
                                                        }

                                                    </div>
                                                </section>
                                            )
                                        })
                                    }

                                </div>
                                <div className={check ? 'btn-order-wrapper' : 'btn-order-wrapper btn-fixed'}>
                                    <Button onClick={update} className='btn-order' variant="warning">{total.toLocaleString('en-US')}đ - Thêm vào giỏ hàng</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}
