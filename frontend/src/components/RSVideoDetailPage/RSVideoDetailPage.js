import React, { Component } from 'react';
import {
    Row,
    Col,
    Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import CardComponent from '../CardComponent/CardComponent';

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

        fetch(`${process.env.REACT_APP_API_HOST}/video/${params.id}`)
            .then((video) => video.json())
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
            })
    }

    getItems() {
        return this.state.items.map((item, index) => <CardComponent key={'i' + index} cardType="items" item={item} showFooter={false}/> );
    }

    getSkills() {
        return this.state.skills.map((skill, index) => <CardComponent key={'s' + index} cardType="skills" item={skill} showFooter={false}/> );
    }

    render() {

        if (!this.state.loaded) return (<p>Loading</p>);

        return (
            <Container>
                <Row>
                    <Col sm="12">
                        <p className="info">{ this.state.name }</p>
                        <p className="info-small">Video Category: { this.state.category }</p>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" title={this.state.name} src={ this.state.video_url } frameBorder="0" allowFullScreen />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <h3>Related Items</h3>
                    </Col>
                    { this.getItems() }
                </Row>
                <Row>
                    <Col sm="12">
                        <h3>Related Skills</h3>
                    </Col>
                    { this.getSkills() }
                </Row>
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