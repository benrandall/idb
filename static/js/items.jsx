import React from 'react';
import ReactDOM from 'react-dom';
import CardGrid from './components/CardGrid.js'

require('../css/index.scss');

ReactDOM.render(
    <CardGrid/>,
    document.getElementById('card-grid')
);