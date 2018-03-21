import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import AboutConstants from './AboutConstants';
import RSContainer from '../RSContainer/RSContainer';
import RSTeamMember from '../RSTeamMember/RSTeamMember';
import GitHubStats from '../GitHubStats/GitHubStats';
import RSTool from '../RSTool/RSTool';
import RSLink from '../RSLink/RSLink';

import './RSAboutPage.css';

export default class RSAboutPage extends Component {

    constructor() {
        super();

        this.state = {
            loaded: false,
            commit_data: [],
            issues: [],
            total_commits: 0,
            total_issues: 0
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_HOST}/about`)
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
        return (
            <Row>
                {
                    this.state.commit_data.map((item) => {
                        let member = AboutConstants.team.members[item[0]];
                        return <RSTeamMember
                        key={item[0]}
                        icon={member.icon}
                        name={member.name}
                        role={member.role}
                        bio={member.bio}
                        commits={item[1]}
                        issues={this.state.issues[item[0]]}
                                />
                    })
                }
            </Row>
        );
    }

    getStats() {
        return (
            <Row>
                <GitHubStats    issues={this.state.total_issues}
                                commits={this.state.total_commits}
                />
            </Row>
        );
    }

    getTools(toolList) {
        return (
            <Row>
                { toolList.map((item) => <RSTool key={item.title} toolDesc={item.desc} toolName={item.title}/>) }
            </Row>
        );
    }

    getLinks() {
        return (
            <Row>
                { AboutConstants.links.data.map((item) => <RSLink key={item.url} title={item.title} url={item.url}/>) }
            </Row>
        );
    }

    render() {

        if (!this.state.loaded) { return (<div>Loading</div>); }

        return (
            <Container>
                <RSContainer    title={AboutConstants.about.title}
                                subtitle={AboutConstants.about.subtitle}
                                body={ (<p>{ AboutConstants.about.body }</p>) }/>


                <RSContainer    title={AboutConstants.team.title}
                                body={ this.getTeamMembers() }
                                    />

                <RSContainer    title={AboutConstants.github.title}
                                subtitle={AboutConstants.github.subtitle}
                                body={ this.getStats() }/>

                <RSContainer    title={AboutConstants.tools.title}
                                subtitle={AboutConstants.tools.subtitle}
                                body={ this.getTools(AboutConstants.tools.data)}/>

                <RSContainer    title={AboutConstants.extra_tools.title}
                                subtitle={AboutConstants.extra_tools.subtitle}
                                body={ this.getTools(AboutConstants.extra_tools.data)}/>
                <RSContainer    title={AboutConstants.links.title}
                                subtitle={AboutConstants.links.subtitle}
                                body={ this.getLinks()}/>
            </Container>
        );
    }
}
