import React, { Component } from 'react';
import {
    Row,
    Col,
    Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import CardComponent from '../CardComponent/CardComponent';
import RSSearchUtils from "../../utilities/RSSearchUtils";

export default class RSVideoDetailPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            category: '',
            icon: '',
            items: [],
            skills: [],
            name: '',
            video_url: ''
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;

        RSSearchUtils.request(`videos/${params.id}`)
            .then((video) => {
                this.setState({
                    loaded: true,
                    category: video.category,
                    icon: video.icon,
                    items: video.items,
                    skills: video.skills,
                    name: video.name,
                    video_url: video.video_url
                })
            });
    }

    getItems() {
        let items = this.state.items.map((item, index) => <CardComponent key={'i' + index} cardType="items" item={item} showFooter={false}/> );

        if (items.length === 0) {
            return null;
        }

        return (
            <div>
                <hr/>
                <Row>
                    <Col sm="12">
                        <p className="info">Related Items</p>
                    </Col>
                    { items }
                </Row>
            </div>
        )
    }

    getSkills() {
        let skills = this.state.skills.map((skill, index) => <CardComponent key={'s' + index} cardType="skills" item={skill} showFooter={false}/> );

        if (skills.length === 0) {
            return null;
        }

        return (
            <div>
                <hr/>
                <Row>
                    <Col sm="12">
                        <p className="info">Related Skills</p>
                    </Col>
                    { skills }
                </Row>
            </div>
        )
    }

    getTitle() {
        return (
            <Row className="nav-padding">
                <Col sm="12">
                    <h2>{ this.state.name }</h2>
                    <p className="info-small">Video Category: { this.state.category === 'runescape'
                                                                                        ? 'Runescape'
                                                                    : 'Old School Runescape' }</p><hr/>
                    <div className="embed-responsive embed-responsive-16by9">
                        <iframe className="embed-responsive-item" title={this.state.name} src={ this.state.video_url } frameBorder="0" allowFullScreen />
                    </div>
                </Col>
            </Row>
        );
    }

    render() {

        if (!this.state.loaded) return (<Row className="nav-padding"><h2 className="mx-auto">Loading...</h2></Row>);

        return (
            <Container>
                { this.getTitle() }
                { this.getItems() }
                { this.getSkills() }
            </Container>
        );
    }
}

RSVideoDetailPage.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    url: PropTypes.string,
};