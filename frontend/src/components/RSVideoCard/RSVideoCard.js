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

const RSVideoCard = (props) => {
    return (
        <Col sm="12" md="6" lg="4">
            <Card>
                <CardImg top width="100%" src={props.icon} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{props.title}</CardTitle>
                    <Link to={'/community/' + props.id}>
                        <Button>Go to video</Button>
                    </Link>
                </CardBody>
            </Card>
        </Col>
    );
};

RSVideoCard.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number
};

export default RSVideoCard