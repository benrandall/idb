import React from 'react';
import ReactDOM from 'react-dom';
import CommunityGrid from "./components/CommunityGrid";

ReactDOM.render(
    <CommunityGrid type="skills" id={ document.getElementById('skill').getAttribute('data-id') }/>,
    document.getElementById('community')
);