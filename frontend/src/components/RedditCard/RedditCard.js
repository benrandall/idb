
import { Col, CardBody, Button, CardTitle, Card } from 'reactstrap';
import React from 'react';


const RedditCard = (props) => {
    return (
        <Col sm={12} md={6} lg={4}>
            <Card>
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>
                    <a href={props.url}>
                        <Button color="secondary">View on Reddit</Button>
                    </a>
                </CardBody>
            </Card>
        </Col>
    );
};

export default RedditCard;