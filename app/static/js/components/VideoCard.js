import React, { Component } from "react";

export default class VideoCard extends Component {

    render() {
        return (
            <div className="col-md-4 col-sm-12">
                <div className="card-img-container">
                    <img src={ this.props.icon } className="card-img-top" />
                </div>
                <div className="card-body">
                    <p className="card-desc">{ this.props.description }</p>
                </div>
                <div className="card-cta">
                    <a href={this.props.url}>watch on YouTube</a>
                </div>
            </div>
        );
    }
};
