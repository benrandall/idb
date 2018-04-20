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
import RSSearchUtils from "../../utilities/RSSearchUtils";

export default class SkillDetailPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            item: {},
            loaded: false
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        RSSearchUtils.request(`items/${params.id}`)
            .then((json) => {
                this.setState({
                    item: json,
                    loaded: true
                });
            });
    }

    getSkills() {
        let skills = this.state.item.skills.map((skill) => {
            return <CardComponent key={`skill${skill.id}`}
                                  cardType="skills"
                                  item={skill}
                                  showFooter={false}/>;
        });

        if (skills.length === 0) {
            return null
        }

        return (
            <div>
                <hr/>
                <Row>
                    <Col sm="12">
                        <p className="info">Related Skills</p>
                    </Col>
                </Row>
                <Row>
                    { skills }
                </Row>
            </div>
        )
    }

    getCommunity() {
        let community = this.state.item.reddits.map((reddit) => {
            return <RSRedditCard key={reddit.url}
                                 title={reddit.title}
                                 url={reddit.url}/>;
        })
        .concat(this.state.item.videos.map((video) => {
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
                            <img src={ this.state.item.icon } className="icon" alt={this.state.item.name}/>
                            <h1>{ this.state.item.name }</h1>
                            <p className="subtext uppercase">{ this.state.item.type }</p>
                            <p>{ this.state.item.examine_info }</p>
                        </div>
                        <div className="right-side">
                            <p className="medium-title">Other Information</p>
                            <h6>Price</h6>
                            <p className="subtext">{ this.state.item.market_price }</p>
                            <h6>Weight</h6>
                            <p className="subtext">{ this.state.item.weight } kg</p>
                            <h6>Member's Only</h6>
                            <p className="subtext">{ this.state.item.members_only ? 'Yes' : 'No' }</p>
                            <h6>Quest Item</h6>
                            <p className="subtext">{ this.state.item.quest_item ? 'Yes' : 'No' }</p>
                            <h6>Equipable</h6>
                            <p className="subtext">{ this.state.item.equipable ? 'Yes' : 'No' }</p>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }

    render() {

        if (!this.state.loaded) { return (<Row className="nav-padding"><h2 className="mx-auto">Loading...</h2></Row>);}

        return (
            <Container id="item" data-id={ this.state.item.id }>
                { this.getGeneralInfo() }
                { this.getSkills() }
                { this.getCommunity() }
            </Container>
        );
    }
}