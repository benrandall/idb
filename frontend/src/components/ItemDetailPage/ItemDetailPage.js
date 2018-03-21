import React, { Component } from "react";
import {
    Row,
    Col,
    Container
} from "reactstrap";
import CardComponent from '../CardComponent/CardComponent';
import RSRedditCard from '../RSRedditCard/RSRedditCard';
import RSVideoCard from '../RSVideoCard/RSVideoCard';

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

        fetch(`${process.env.REACT_APP_API_HOST}/item/${params.id}`)
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
            community.push(<RSRedditCard title={reddit.title} url={reddit.url}/>)
        }

        for (let video of this.state.item.videos) {
            community.push(<RSVideoCard title={video.title} icon={video.icon} id={video.id} />);
        }

        return community;
    }

    render() {

        if (!this.state.loaded) { return (<div></div>);}

        return (
            <Container id="item" data-id={ this.state.item.id }>
                <Row>
                    <Col sm="12">
                        <p className="info">General Information</p>
                        <div className="detail-container">
                            <div className="left-side">
                                <img src={ this.state.item.icon } className="icon" alt={this.state.item.name}/>
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
            </Container>
        );
    }
}