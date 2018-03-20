import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'reactstrap';

import './RSTeamMember.css';

const RSTeamMember = (props) => {

    return (
        <Col lg='4' sm='6' className="text-center">
            <img className="rounded-circle img-responsive img-center" src={ props.icon } alt="" />
            <h4>{ props.name }
                <small className="text-muted"> { props.role }</small>
            </h4>
            <p> { props.bio }</p>
            <p><b>Number of commits:</b> { props.commits || -1 }</p>
            <p><b>Number of issues:</b> { props.issues || -1 }</p>
            <p><b>Number of unit tests: </b> { props.tests || 0 }</p>
        </Col>
    );
};

RSTeamMember.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    commits: PropTypes.number,
    issues: PropTypes.number,
    tests: PropTypes.number
};

export default RSTeamMember;