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

            for(let j = 0; j < 4 && itemsLeft > 0; i++) {
                row.push(
                    <CardComponent/>
                );
                --itemsLeft;
            }

            rows.push(
                <div className="row">
                    {{ row }}
                </div>
            );
        }

        return (
          <div className="container">
              {{ rows }}
          </div>
        );
    }
};
