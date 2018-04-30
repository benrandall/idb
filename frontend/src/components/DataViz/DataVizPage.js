import React, { Component } from 'react';

import './DataViz.css';

export default class DataVizPage extends Component {
    render() {
        return (
            <div id='dataViz'>
                <script type="text/javascript" src={`http://api.runescrape.lol/static/js/d3.js`}></script>
                <script type="text/javascript" src="http://api.runescrape.lol/static/js/d3.geo.js"></script>
                <script type="text/javascript" src="http://api.runescrape.lol/static/js/d3.geom.js"></script>
                <script type="text/javascript" src="http://api.runescrape.lol/static/js/d3.tip.js"></script>
                <script type="text/javascript" src="http://api.runescrape.lol/static/js/dataviz.js"></script>
            </div>
        )
    }
}
