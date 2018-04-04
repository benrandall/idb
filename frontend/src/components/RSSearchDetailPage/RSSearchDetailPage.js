import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RSSearchHeader from "../RSSearchHeader/RSSearchHeader";
import CardComponent from "../CardComponent/CardComponent";
import RSRedditCard from "../RSRedditCard/RSRedditCard";
import RSVideoCard from "../RSVideoCard/RSVideoCard";

// import PropTypes from 'prop-types';

export default class RSSearchDetailPage extends React.Component {

    constructor(props) {
        super(props);

        console.log("Hello");
        this.state = {
            results: [],
            hasMore: false,
            loaded: false
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(`Mounted, searching: ${params.query}`);
        this.search(params.query);
    }

    render() {

        if (!this.state.loaded) {
            return (<p>Loading</p>);
        }

        return (
            <Container>
                <Row>
                    <Col sm="12">
                        <RSSearchHeader handler={(value) => this.handleSearch(value)}/>
                    </Col>
                </Row>
                <Row>
                    {
                        this.state.results.map((result) => {

                            // Is an Item
                            if (result.reddits && result.videos && result.skills) {
                                return <CardComponent cardType="items" item={result}/>
                            }
                            // Is a Skill
                            else if (result.reddits && result.videos && result.items) {
                                return <CardComponent cardType="skills" item={result}/>
                            }
                            else if (result.video_url) {
                                return <RSVideoCard title={result.name} icon={result.icon} id={result.id}/>
                            }
                            // Is a reddit item
                            else if (result.skills && result.items) {
                                return <RSRedditCard url={result.url} title={result.title}/>
                            } else {
                                return (<h1>ERROR</h1>)
                            }
                        })
                    }
                </Row>
            </Container>
        );

    }

    handleSearch(value) {
        this.props.history.push(`/search/${value}`);
        this.search(value);
    }

    search(value) {
        fetch(`${process.env.REACT_APP_API_HOST}/search?q=${value}&`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    results: json.result,
                    hasMore: json.has_more,
                    loaded: true
                });
            })
    }
}