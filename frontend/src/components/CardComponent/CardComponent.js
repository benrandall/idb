import React, { Component } from "react";
import PropTypes from 'prop-types';
import './CardComponent.css';
import { Link } from 'react-router-dom';
import {
    Card,
    CardFooter,
    CardBody,
    CardTitle,
    Col
} from 'reactstrap';

class CardComponent extends Component {

    getFooterIcons() {
        if (this.props.cardType !== "videos") {
            return (
                <div className="card-icons float-right">
                    { this.getRedditLogo() }
                    { this.getYoutubeLogo() }
                </div>
            )
        }

        return null;
    }

    getRedditLogo() {
        if (this.props.item.reddits && this.props.item.reddits.length > 0) {
            return <img src={`${process.env.REACT_APP_API_HOST}/images/reddit.svg`} alt="Reddit Logo"/>;
        }

        return null;
    };

    getYoutubeLogo() {
        if (this.props.item.videos && this.props.item.videos.length > 0) {
            return <img src={`${process.env.REACT_APP_API_HOST}/images/youtube-small.svg`} alt="YouTube Logo"/>;
        }

        return null;
    }

    getFooter() {
        if (!this.props.showFooter) { return null }

        return (
            <CardFooter className="text-muted">
                { this.getFooterIcons() }
            </CardFooter>
        );
    }

    render() {
        return (
            <Col sm="12" md="3">
                <Link to={'/' + this.props.cardType + '/' + this.props.item.id}
                      style={{ textDecoration: 'none', color: '#182329' }}>
                    <Card>
                        <div className="card-img-container">
                            <img top="true"
                                 className="card-img-top-custom"
                                 width="100%"
                                 src={ this.props.item.icon }
                                 alt={ this.props.item.name }/>
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
}

CardComponent.propTypes = {
    cardType: PropTypes.string,
    showFooter: PropTypes.bool,
    item: PropTypes.object
};

export default CardComponent;