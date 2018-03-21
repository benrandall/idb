import React, { Component } from "react";
import { Container, Row } from 'reactstrap';

import CardComponent from "../CardComponent/CardComponent";
import './CardGrid.css';

export default class CardGrid extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        console.log("card grid");
        console.log(process.env);
        fetch(`${process.env.REACT_APP_API_HOST}/` + this.props.cardType + '/all')
            .then((items) => { return items.json() })
            .then((json) => {
                this.setState({
                    items: json
                });
            });
    }

    render() {

        if (this.state.items.length === 0) {
            return (<div></div>);
        }

        let data = this.state.items;

        let numItems = data.length;
        let itemsLeft = numItems;

        let rows = [];
        let index = 0;

        let numRows = Math.ceil(numItems / 4);

        for (let i = 0; i < numRows; i++) {
            let row = [];

            for(let j = 0; j < 4 && itemsLeft > 0; j++) {
                row.push(
                    <CardComponent key={ (i * 4) + j} item={data[index++]} cardType={this.props.cardType} showFooter={true}/>
                );
                --itemsLeft;
            }

            rows.push(row);
        }

        return (
            <Container>
                {rows.map((row) => {
                    return (
                        <Row className="nav-padding">
                            { row }
                        </Row>
                    );
                })}
            </Container>
        )
    }
};
