import React from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import { useViewport } from "./Funtions";

export function Item() {
    return (
        <Card style={{ width: '100%', padding: 5, boxShadow:'0 0 5px #bbb', border:0 }}>
            <Card.Img variant="top" src="https://minio.thecoffeehouse.com/image/admin/1639377738_ca-phe-sua-da_400x400.jpg"  style={{ borderRadius:5 }} />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                <Button variant="primary">Go somewhere</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default function Products() {
    const check = useViewport()
    return (
        <div className={check ? "container-main top-60 default" : "main default"}>
            <Container>
                <Row>
                    <Col xs={12} md={2}>
                        <Item />
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
