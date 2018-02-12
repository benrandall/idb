import React, { Component } from "react";

require('../../css/CardComponent.scss');

export default class CardComponent extends Component {

    render() {
        return (
            <div className="card col-md-3 col-sm-12">
                <img src="#" className="card-img-top" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
        );
    }

};
