import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import Highlighter from "react-highlight-words";
import { Link } from 'react-router-dom';

import './RSSearchCard.css';

const RSSearchCard = (props) => {

    const createCard = (props) => {
        return (<Card>
            <div className="card-img-container">
                <img className="card-img-top-custom" top="true" width="100%" src={ props.imageURL } alt={ props.title }/>
            </div>
            <CardBody>
                <CardTitle>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={props.searchWords}
                        autoEscape={true}
                        textToHighlight={props.title}
                      />
                </CardTitle>
                {
                    props.body &&
                    <CardText>
                        <Highlighter
                            highlightClassName="highlight"
                            searchWords={props.searchWords}
                            autoEscape={true}
                            textToHighlight={props.body}
                          />
                    </CardText>
                }
            </CardBody>
        </Card>)
    };

    if (props.externalURL) {
        return (
            <Col sm="12" md="6" lg="4">
                <a href={props.externalURL} style={{ textDecoration: 'none', color: '#182329' }}>
                    { createCard(props) }
                </a>
            </Col>
        )
    }

    return (
        <Col sm="12" md="6" lg="4">
            <Link to={'/' + props.type + '/' + props.id} style={{ textDecoration: 'none', color: '#182329' }}>
                { createCard(props) }
            </Link>
        </Col>
    );
};

RSSearchCard.propTypes = {
    searchWords: PropTypes.array,
    title: PropTypes.string,
    body: PropTypes.string,
    imageURL: PropTypes.string,
    externalURL: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.number
};

export default RSSearchCard;