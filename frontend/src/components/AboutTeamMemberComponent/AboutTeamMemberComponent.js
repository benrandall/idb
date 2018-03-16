import React from 'react';
import { Col } from 'reactstrap';

import './AboutTeamMemberComponent.css';

const AboutTeamMemberComponent = (props) => {
    return (
        <Col lg='4' sm='6' class="text-center">
            <img className="img-circle img-responsive img-center" src={ props.icon } alt="" />
            <h3>{ props.name }
                <small>{ props.role }</small>
            </h3>
            <p> { props.bio }</p>
            <p><b>Number of commits:</b> { props.commits }</p>
            <p><b>Number of issues:</b> { props.issues }</p>
            <p><b>Number of unit tests: </b> { props.tests }</p>
        </Col>
    );
};

export default AboutTeamMemberComponent;