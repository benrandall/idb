import React, { Component } from "react";

require('../../css/CardComponent.scss');

export default class CardComponent extends Component {

    render() {
        return (
            <div className="col-md-3 col-sm-12">
                <div className="rs-card">
                    <div className="card-img-container">
                        <img src="/static/img/image.png" className="card-img-top" />
                    </div>
                    <div className="card-body">
                        <div className="card-title-contents">
                            <h5 className="card-title">Card title</h5>
                            <div className="card-icons">
                                <img src="/static/img/reddit-1.svg"/>
                                <img src="/static/img/YouTube-small-full_color_light.svg"/>
                            </div>
                        </div>
                  </div>
                </div>
            </div>
        );
    }
};
