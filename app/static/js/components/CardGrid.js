import React, { Component } from "react";
import CardComponent from "./CardComponent"

export default class CardGrid extends Component {

    render() {
        let data = JSON.parse(this.props.data);

        let numItems = data.length;
        let itemsLeft = numItems;

        let rows = [];
        let index = 0;

        let numRows = Math.ceil(numItems / 4);

        for (let i = 0; i < numRows; i++) {
            let row = [];

            for(let j = 0; j < 4 && itemsLeft > 0; j++) {
                row.push(
                    <CardComponent key={i+j} item={data[index++]} cardType={this.props.cardType}/>
                );
                --itemsLeft;
            }

            rows.push(row);
        }

        return rows.map((row) => {
            return (
                <div className="row gutter-8">
                    { row }
                </div>
            );
        });
    }
};
