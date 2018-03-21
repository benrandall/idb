import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col } from 'reactstrap';

import './RSLink.css';

const RSLink = (props) => {
    return (
        <Col sm="2">
            <Button tag="a" href={ props.url } style={{color: "white"}} color="primary">{ props.title }</Button>
        </Col>
    );
};

RSLink.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string
};

export default RSLink;