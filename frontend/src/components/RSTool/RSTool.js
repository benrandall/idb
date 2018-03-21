import React from 'react';
import PropTypes from 'prop-types';

const RSTool = (props) => {
    return (
        <div>
            <h4>{props.toolName}: </h4>
            <p>{props.toolDesc} </p>
        </div>
    );
};

RSTool.propTypes = {
    toolName: PropTypes.string,
    toolDesc: PropTypes.string
};

export default RSTool;