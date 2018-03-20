import React from 'react';
import PropTypes from 'prop-types';

const RSTool = (props) => {
    return (
        <div>
            <h5>{props.toolName}: </h5>
            <p>{props.toolDesc} </p>
        </div>
    );
};

RSTool.propTypes = {
    toolName: PropTypes.string,
    toolDesc: PropTypes.string
};

export default RSTool;