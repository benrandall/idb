import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Col,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Button
} from 'reactstrap';
import './RSVideoCard.css';

const RSVideoCard = (props) => {
    return (
        <Col sm="12" md="6" lg="4">
            <Link to={'/community/' + props.id} style={{ textDecoration: 'none', color: '#182329' }}>
                <Card>
                    <CardImg top width="100%" src={props.icon} alt="Card image cap" />
                    <CardBody>
                        <CardTitle className="truncate">{props.title}</CardTitle>
                    </CardBody>
                </Card>
            </Link>
        </Col>
    );
};

RSVideoCard.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number
};

export default RSVideoCard