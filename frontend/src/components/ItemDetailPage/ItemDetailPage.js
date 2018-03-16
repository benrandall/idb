import React, { Component } from "react";
import { Row, Col, Card } from "reactstrap";
import CardComponent from '../CardComponent/CardComponent';
import RedditCard from '../RedditCard/RedditCard';
import VideoCard from '../VideoCard/VideoCard';

import './ItemDetailPage.css';

export default class SkillDetailPage extends Component {

    constructor() {
        super();
        this.state = {
            item: {},
            loaded: false
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        fetch(`http://127.0.0.1:5000/api/item/${params.id}`)
            .then((item) => { return item.json() })
            .then((json) => {
                this.setState({
                    item: json,
                    loaded: true
                });
            });
    }

    getSkills() {

        let skills = [];

        for (let skill of this.state.item.skills) {
            skills.push(<CardComponent cardType="skills" item={skill} showFooter={false}/>)
        }

        return skills;
    }

    getCommunity() {
        let community = [];

        for (let reddit of this.state.item.reddits) {
            community.push(<RedditCard title={reddit.title} url={reddit.url}/>)
        }

        for (let video of this.state.item.videos) {
            community.push(<VideoCard title={video.title} icon={video.icon} id={video.id} />);
        }

        return community;
    }

    render() {

        if (!this.state.loaded) { return (<div></div>);}

        return (
            <div className="container" id="item" data-id={ this.state.item.id }>
                <Row>
                    <Col sm="12">
                        <p className="info">General Information</p>
                        <div className="detail-container">
                            <div className="left-side">
                                <img src={ this.state.item.icon } className="icon"/>
                                <h1>{ this.state.item.name }</h1>
                                <p className="subtext uppercase">{ this.state.item.type }</p>
                                <p>{ this.state.item.examine_info }</p>
                            </div>
                            <div className="right-side">
                                <p className="medium-title">Other Information</p>
                                <p className="small-title">Price</p>
                                <p className="subtext">{ this.state.item.market_price }</p>
                                <h6>Weight</h6>
                                <p className="subtext">{ this.state.item.weight }</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <p className="info">Related Skills</p>
                    </Col>
                </Row>
                <Row>
                    { this.getSkills() }
                </Row>
                <Row>
                    <Col sm="12">
                        <p className="info">Community Sources</p>
                    </Col>
                </Row>
                <Row>
                    { this.getCommunity() }
                </Row>
            </div>
        );
    }
}