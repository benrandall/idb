import React, { Component } from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import CardComponent from "../CardComponent/CardComponent";
import RSRedditCard from "../RSRedditCard/RSRedditCard";
import RSVideoCard from "../RSVideoCard/RSVideoCard";

import './SkillDetailPage.css';

export default class SkillDetailPage extends Component {

    constructor() {
        super();
        this.state = {
            skill: {},
            loaded: false
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        fetch(`${process.env.REACT_APP_API_HOST}/skill/${params.id}`)
            .then((skill) => { return skill.json() })
            .then((json) => {
                this.setState({
                    skill: json,
                    loaded: true
                });
            });
    }

    getItems() {
        let items = [];

        for (let item of this.state.skill.items) {
            items.push(<CardComponent cardType="items" item={item} showFooter={false}/>);
        }

        return items;
    }

    getCommunity() {
        let community = [];

        for (let reddit of this.state.skill.reddits) {
            community.push(<RSRedditCard title={reddit.title} url={reddit.url}/>)
        }

        for (let video of this.state.skill.videos) {
            community.push(<RSVideoCard title={video.title} icon={video.icon} id={video.id} />);
        }

        return community;
    }

    render() {

        if (!this.state.loaded) { return (<div>Loading</div>) }

        return (
            <div className="container" id="skill" data-id={ this.props.id }>
                <Row>
                    <Col sm="12">
                        <p className="info">General Information</p>
                        <div className="detail-container">
                            <div className="left-side">
                                <img src={ this.state.skill.icon } alt={this.state.skill.name} />
                                <h1>{ this.state.skill.name }</h1>
                                <p>{ this.state.skill.description }</p>
                            </div>
                            <div className="right-side">
                                <p className="medium-title">Other Information</p>
                                <p className="small-title">Members Only</p>
                                <p className="subtext">{ this.state.skill.members_only ? "Yes" : "No" }</p>
                                <h6>Max Level</h6>
                                <p className="subtext">{ this.state.skill.max_level }</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <p className="info">Related Items</p>
                </Row>
                <Row>
                    { this.getItems() }
                </Row>
                <Row>
                    <p className="info">Community Sources</p>
                </Row>
                <Row>
                    { this.getCommunity() }
                </Row>
            </div>
        );
    }
}