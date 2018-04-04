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

    getFooter() {
        if (!this.props.showFooter) { return null }

        return (<CardFooter className="text-muted">

                {this.props.cardType !== "videos" &&
                        <div className="card-icons float-right">
                        {
                            this.props.item.reddits
                            && this.props.item.reddits.length > 0
                            && <img src={`${process.env.REACT_APP_API_HOST}/images/reddit.svg`} alt="Reddit Logo"/>
                        }
                        {
                            this.props.item.videos
                            && this.props.item.videos.length > 0
                            && <img src={`${process.env.REACT_APP_API_HOST}/images/youtube-small.svg`} alt="YouTube Logo"/>
                        }
                        </div>
                    }
                </CardFooter>);
    }

    render() {
        return (
            <Col sm="12" md="3">
                <Link to={'/' + this.props.cardType + '/' + this.props.item.id} style={{ textDecoration: 'none', color: '#182329' }}>
                    <Card>
                        <div className="card-img-container">
                            <img className="card-img-top-custom" top="true" width="100%" src={ this.props.item.icon } alt={ this.props.item.name }/>
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
    item: {
        reddits: PropTypes.array,
        videos: PropTypes.array,
        id: PropTypes.number,
        icon: PropTypes.string,
        name: PropTypes.string
    }
};

export default CardComponent;