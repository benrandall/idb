import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';

const RSContainer = (props) => {
    return (
        <Row>
            <Col sm='12'>
                <h1>{ props.title }
                    { props.subtitle && <small className="text-muted"> { props.subtitle }</small>}
                </h1><hr/>
                <p>{ props.body }</p>
            </Col>
        </Row>
    );
};

RSContainer.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    body: PropTypes.element
};

export default RSContainer;