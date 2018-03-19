import React from 'react';
import PropTypes from 'prop-types';

import {
    Col,
    CardBody,
    Button,
    CardTitle,
    Card
} from 'reactstrap';


const RSRedditCard = (props) => {
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

RSRedditCard.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string
};

export default RSRedditCard;