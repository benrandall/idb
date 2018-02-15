import React, { Component } from "react";

export default class SocialTextCard extends Component {

    render() {
        return (
            <div className="col-md-4 col-sm-12">
                <span>{ this.props.username }</span>
                <h2>{ this.props.title }</h2>
                <h3>{ this.props.body }</h3>
                <div className="card-cta">
                    <a href={this.props.url}>continue on youtube/></a>
                </div>
            </div>
        );
    }
};
