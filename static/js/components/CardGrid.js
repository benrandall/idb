import React, { Component } from "react";
import CardComponent from "./CardComponent"

require('../../css/CardComponent.scss');

export default class CardGrid extends Component {

    render() {

        let numItems = 9, itemsLeft = 9;

        let rows = [];

        let numRows = Math.ceil(numItems / 4);

        for (let i = 0; i < numRows; i++) {
            let row = [];

            for(let j = 0; j < 4 && itemsLeft > 0; j++) {
                row.push(
                    <CardComponent key={i+j}/>
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
