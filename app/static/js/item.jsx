import React from 'react';
import ReactDOM from 'react-dom';
import CommunityGrid from "./components/CommunityGrid";

ReactDOM.render(
    <CommunityGrid type="items" id={ document.getElementById('item').getAttribute('data-id') }/>,
    document.getElementById('community')
);