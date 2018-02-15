import React, { Component } from "react";

export default class VideoCard extends Component {

    render() {
        return (
            <div className="col-md-4 col-sm-12">
                <div className="community-card">
                    <img src={ this.props.icon } className="video-thumb" />
                    <div className="card-body">
                        <p className="name">{ this.props.description }</p>
                    </div>
                    <div className="watch-on">
                        <a href={this.props.url}>watch on YouTube <img src="/static/img/YouTube-small-full_color_light.svg"/></a>
                    </div>
                </div>
            </div>
        );
    }
};
