import React, { Component } from "react";
import CardComponent from "./CardComponent"

require('../../css/CardComponent.scss');

export default class CardGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch('/api/' + this.props.cardType + '/all')
            .then(d => d.json())
            .then(d => {
                this.setState({
                    items: d
                })
            })
    }

    render() {

        if (!this.state.items) { return (<p>Loading...</p>) }

        let numItems = this.state.items.length;
        let itemsLeft = numItems;

        let rows = [];
        let index = 0;

        let numRows = Math.ceil(numItems / 4);

        for (let i = 0; i < numRows; i++) {
            let row = [];

            for(let j = 0; j < 4 && itemsLeft > 0; j++) {
                row.push(
                    <CardComponent key={i+j} item={this.state.items[index++]} cardType={this.props.cardType}/>
                );
                --itemsLeft;
                console.log("Pushed card into row");
            }

            rows.push(
                <div className="row gutter-8">
                    { row }
                </div>
            );

            console.log("Pushed row");
        }

        return rows;
    }
};
