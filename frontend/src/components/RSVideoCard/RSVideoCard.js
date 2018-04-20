import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Col,
    Card,
    CardBody,
    CardImg,
    CardTitle,
} from 'reactstrap';
import './RSVideoCard.css';

const RSVideoCard = (props) => {
    return (
        <Col sm="12" md="6" lg="4">
            <Link to={'/community/' + props.id} className="rs-video-card">
                <Card>
                    <CardImg top width="100%" src={props.icon} alt={props.title} />
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