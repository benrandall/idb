import React, { Component } from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import CardComponent from "../CardComponent/CardComponent";
import RSRedditCard from "../RSRedditCard/RSRedditCard";
import RSVideoCard from "../RSVideoCard/RSVideoCard";

import './SkillDetailPage.css';
import RSSearchUtils from "../../utilities/RSSearchUtils";

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

        RSSearchUtils.request(`skills/${params.id}`)
            .then((json) => {
                this.setState({
                    skill: json,
                    loaded: true
                });
            });
    }

    getItems() {
        let items = this.state.skill.items.map((item) => {
            return <CardComponent key={`item${item.id}`}
                                  cardType="items"
                                  item={item}
                                  showFooter={false}/>;
        });

        if (items.length === 0) {
            return null
        }

        return (
            <div>
                <hr/>
                <Row>
                    <Col sm="12">
                        <p className="info">Related Items</p>
                    </Col>
                </Row>
                <Row>
                    { items }
                </Row>
            </div>
        )
    }

    getCommunity() {
        let community = this.state.skill.reddits.map((reddit) => {
            return <RSRedditCard key={reddit.url}
                                 title={reddit.title}
                                 url={reddit.url}/>;
        })
        .concat(this.state.skill.videos.map((video) => {
            return <RSVideoCard key={`video${video.id}`}
                                title={video.name}
                                icon={video.icon}
                                id={video.id} />;
        }));

        if (community.length === 0) {
            return null;
        }

        return (
            <div>
                <hr/>
                <Row>
                    <Col sm="12">
                        <p className="info">Community Sources</p>
                    </Col>
                </Row>
                <Row>
                    { community }
                </Row>
            </div>
        )
    }

    getGeneralInfo() {
        return (
            <Row className="nav-padding">
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
                            <h6>Skill Type</h6>
                            <p className="subtext">{ this.state.skill.skill_type }</p>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }

    render() {

        if (!this.state.loaded) { return (<Row className="nav-padding"><h2 className="mx-auto">Loading...</h2></Row>) }

        return (
            <div className="container" id="skill" data-id={ this.props.id }>
                { this.getGeneralInfo() }
                { this.getItems() }
                { this.getCommunity() }
            </div>
        );
    }
}
