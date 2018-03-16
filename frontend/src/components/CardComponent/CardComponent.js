import React, { Component } from "react";
import './CardComponent.css';
import { Link } from 'react-router-dom';
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, CardImg, Col } from 'reactstrap';

export default class CardComponent extends Component {

    getFooter() {
        if (!this.props.showFooter) { return null }

        return (<CardFooter className="text-muted">

                {this.props.cardType !== "videos" &&
                        <div className="card-icons float-right">
                        {
                            this.props.item.reddits
                            && this.props.item.reddits.length > 0
                            && <img src="http://www.runescrape.lol/static/img/reddit-1.svg"/>
                        }
                        {
                            this.props.item.videos
                            && this.props.item.videos.length > 0
                            && <img src="http://www.runescrape.lol/static/img/YouTube-small-full_color_light.svg"/>
                        }
                        </div>
                    }
                </CardFooter>);
    }

    render() {
        return (
            <Col sm="12" md="3">
                <Link to={'/' + this.props.cardType + '/' + this.props.item.id}>
                    <Card>
                        <div className="card-img-container">
                            <img className="card-img-top-custom" top width="100%" src={ this.props.item.icon }/>
                        </div>
                        <CardBody>
                            <CardTitle>{this.props.item.name}</CardTitle>
                        </CardBody>

                        { this.getFooter() }
                    </Card>
                </Link>
            </Col>
        );
    }
};
