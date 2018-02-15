import React, { Component } from "react";
import VideoCard from './VideoCard.js';
import SocialTextCard from './SocialTextCard';

export default class CommunityGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch('/api/' + this.props.type +'/' + this.props.id + '/videos')
            .then(d => d.json())
            .then(d => {
                this.setState({
                    videos: d
                })
            });
    }

    render() {
        if (!this.state.videos) {return <p>Loading</p>}

        return this.state.videos.map((item) => {
            return <VideoCard icon={item.icon}
                              description={item.name}
                              url={item.video_url} />;
        });
    }
};
