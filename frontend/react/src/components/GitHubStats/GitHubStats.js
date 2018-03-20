import React from 'react';
import { Col } from 'reactstrap';

import PropTypes from 'prop-types';

import './GitHubStats.css';

const GitHubStats = (props) => {
    return (
        <Col sm="12">
            <p> <b>Total commits:</b> { props.commits }</p>
            <p> <b>Total issues:</b> { props.issues }</p>
            <p> <b>Total unit tests:</b> { props.tests || 0 }</p>
        </Col>
    );
};

GitHubStats.propTypes = {
    commits: PropTypes.number,
    issues: PropTypes.number,
    tests: PropTypes.number,
};

export default GitHubStats;