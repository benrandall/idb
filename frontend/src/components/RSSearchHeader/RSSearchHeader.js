import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import RSSearchBar from '../RSSearchBar/RSSearchBar';
import Select from "react-virtualized-select";

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

export default class RSSearchHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modelFilters: []
        };
    }


    fieldDidSearch(value) {
        this.props.history.push(`/search/${value}`);
        //this.search(value);
    }

    fieldDidClear() {

    }

    fieldDidChange() {

    }

    render() {
        return (
            <div>
            <RSSearchBar onSearch={(value) => {
                    this.props.handler ? this.props.handler(value) : this.fieldDidSearch(value)
                }
            }
                         onClear={this.fieldDidClear}
                         onChange={this.fieldDidChange}
            />
            <Select options={[
                {
                    label: `Reddit Posts`,
                    value: 'reddits'
                },
                {
                    label: `YouTube Videos`,
                    value: 'videos'
                },
                {
                    label: `Skills`,
                    value: `skills`
                },
                {
                    label: `Items`,
                    value: `items`
                }
                ]}
                onChange={(values) => {
                    this.setState({modelFilters: values});
                    console.log(this.state);
                }}
                multi
                value={this.state.modelFilters}
            />

            </div>
        );
    }
};

RSSearchHeader.propTypes = {

};