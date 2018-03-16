import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './AboutPageComponent.css';

export default class AboutPageComponent extends Component {

    constructor() {
        super();

        this.runescape_desc = "Runescape is a game that was a hit in the early 2000s. This database is a collection of the skills, items, and associated youtube videos & reddit posts for attaining the desired skills/items.As of right now, there are plenty of websites that have information on the internal mechanics of the game, including skills, items, and activities. However, they're all written guides and lack a community around it. None of these websites have any curated multimedia content about the game. By merging Youtube and Reddit posts, users can now see see both the latest videos, tutorials, events AND the comments from the communities held within the Reddit posts to get a more wholesome view of the game. Intended users include all Runescape users, whether using the 2007 version or most recent version of the game. ";

        this.state = {
            loaded: false,
            commit_data: [],
            issues: [],
            total_commits: 0,
            total_issues: 0
        };
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:5000/api/about`)
            .then((about) => { return about.json() })
            .then((json) => {
                this.setState({
                    loaded: true,
                    commit_data: json.commit_data,
                    issues: json.issues,
                    total_commits: json.total_commits,
                    total_issues: json.total_issues
                });
            });
    }

    getTeamMembers() {
        
    }

    render() {

        if (!this.state.loaded) { return (<div></div>); }

        return (
            <Container>
                <Row>
                    <Col sm='12'>
                        <h1 className="page-header">About Us
                            <small>Meet Me In Lumbridge</small>
                        </h1>
                        <p>{ this.runescape_desc }</p>
                    </Col>
                </Row>
                <Row>
                    { this.getTeamMembers()}
                </Row>
            </Container>
        );
    }
}
