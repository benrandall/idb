import React, { Component } from "react";

require('../../css/CardComponent.scss');

export default class CardComponent extends Component {

    render() {
        return (
            <div className="col-md-3 col-sm-12">
                <a href={'/items/' + this.props.item.id}>
                <div className="rs-card">
                    <div className="card-img-container">
                        <img src={ this.props.item.icon } className="card-img-top" />
                    </div>
                    <div className="card-body">
                        <div className="card-title-contents">
                            <h5 className="card-title truncate">{ this.props.item.name }</h5>
                            <div className="card-icons">
                                { this.props.item.reddits.length > 0 && <img src="/static/img/reddit-1.svg"/> }
                                { this.props.item.videos.length > 0 && <img src="/static/img/YouTube-small-full_color_light.svg"/> }
                            </div>
                        </div>
                  </div>
                </div>
                </a>
            </div>
        );
    }
};
