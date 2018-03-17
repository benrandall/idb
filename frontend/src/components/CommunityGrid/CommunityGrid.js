import React, { Component } from "react";
import { Container, Row } from "reactstrap";

import VideoCard from '../VideoCard/VideoCard';
import RedditCard from "../RedditCard/RedditCard";

export default class CommunityGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/api/community/all')
            .then(d => d.json())
            .then(d => {
                console.log(d);
                this.setState({
                    videos: d.videos,
                    reddits: d.reddits,
                    loaded: true,
                })
            });
    }

    render() {
        if (!this.state.loaded) {return <p>Loading</p>}

        let videos = this.state.videos.map((item) => {
            return <VideoCard icon={item.icon}
                              id={item.id}
                              title={item.name}/>;
        });

        let reddits = this.state.reddits.map((item) => {
            return <RedditCard title={item.title}
                              url={item.url}/>
        });

        let concat = videos.concat(reddits);

        return (
            <Container>
                <Row>
                    { concat }
                </Row>
            </Container>
        );
    }
};
