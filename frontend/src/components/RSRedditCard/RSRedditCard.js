import React from 'react';
import PropTypes from 'prop-types';
import './RSRedditCard.css';

import {
    Col,
    CardBody,
    Button,
    CardTitle,
    CardImg,
    Card
} from 'reactstrap';


const RSRedditCard = (props) => {
    return (
        <Col sm={12} md={6} lg={4}>
            <Card>
                <CardImg top width="100%" src={`${process.env.REACT_APP_API_HOST}/images/reddit-logo.jpg`} alt="Card image cap" />
                <CardBody>
                    <CardTitle className="truncate">{props.title}</CardTitle>
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