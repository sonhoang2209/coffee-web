import React from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useViewport } from "./Functions";
import { useSelector, useDispatch } from "react-redux";
import Image from 'react-bootstrap/Image'
import { getProductList, getCategoryList } from '../reducers/productReducer';
import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

export default function Products() {
    const check = useViewport()
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const products = useSelector((store) => store.productReducer.products);
    const categories = useSelector((store) => store.productReducer.categories);
    const [category, setCategory] = React.useState(1)
    const [items, setItems] = React.useState([])
    
    const handClick = (value) => {
        setCategory(value);
    }

    const clickProduct = (data) => {
        console.log(data)
        navigate(`/Product/${data._id}`,{state: { data: data }})
    };
    
    React.useEffect(() => {
        dispatch(getProductList())
        dispatch(getCategoryList())
        setItems(products.filter(item => item.type_id === category))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    function Item({ data }) {
        return (
            <Col xs={12} sm={4} md={2}>
                <Card onClick={() => clickProduct(data)} className='card' style={{ width: '100%', padding: 5, boxShadow: '0 0 5px #bbb', border: 0, marginBottom: 25 }}>
                    <Card.Img variant="top" src={data.thumbnail} style={{ borderRadius: 5 }} />
                    <Card.Body>
                        <Card.Title className='card-title'>{data.name}</Card.Title>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <p style={{ margin: 0 }}>
                                {data.price.toLocaleString('en-US')}
                            </p>
                            <Button variant="warning" style={{ borderRadius: 20, color: '#fff', width:35, height:35, justifyContent:'center', alignItems:'center',display:'flex' }}><AddOutlinedIcon /></Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )
    }

    return (
        <div className={check ? "container-main top-60 default" : "main top-60 default"}>
            <Container>
                <div className='categories'>
                    {
                        categories.map((e, i) => {
                            return (
                                <div key={i} className={e.type_id === category ? 'item active' : 'item'}>
                                    <button onClick={() => handClick(e.type_id)} className='button'>
                                        <div className='cate-thumbnail'><Image className='image' src={e.thumbnail} /></div>
                                        <p className='text'>{e.name}</p>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <Row>
                    {
                        items.map((item, index) => {
                            return (
                                <Item data={item} key={index} />
                            )
                        })
                    }
                </Row>
            </Container>
        </div>

    )
}
