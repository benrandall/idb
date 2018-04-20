import React, {Component} from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import RSSearchBar from '../RSSearchBar/RSSearchBar';
import Select from 'react-select';

import "react-select/dist/react-select.css";
import "react-virtualized/styles.css";
import "react-virtualized-select/styles.css";

export default class RSSearchHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            availableFilters: props.availableFilters,
            availableSorts: props.availableSorts,
            modelFilters: [],
            sorter: null
        };
    }


    fieldDidSearch(value) {
        this.props.history.push(`/search/${value}`);
    }

    /*  We don't have a need to monitor, but the props are required  */
    fieldDidClear() {}
    fieldDidChange() {}

    getSearchBar() {
        if (!this.props.search) {
            return null;
        }

        return (
            <Col sm={12} md={4}>
                <RSSearchBar onSearch={ (value) => this.props.onSearch
                                                    ? this.props.onSearch(value)
                                                    : this.fieldDidSearch(value) }
                             onClear={this.fieldDidClear}
                             onChange={this.fieldDidChange}
                />
            </Col>
        )
    }

    getFilter() {
        if (!this.props.filter) {
            return null;
        }

        return (
            <Col sm={12} md={4}>
                <h5>Filter by:</h5>
                <Select options={this.state.availableFilters}
                    onChange={(modelFilters) => this.setState({modelFilters}, () => {
                        this.props.onFilterChange && this.props.onFilterChange(this.state.modelFilters);
                    })}
                    multi
                    searchable
                    placeholder="Filters"
                    removeSelected
                    value={this.state.modelFilters}
                />
            </Col>
        );
    }

    getSort() {
        if (!this.props.sort) {
            return null;
        }

        return (
            <Col sm={12} md={4}>
                <h5>Sort by:</h5>
                <Select options={this.state.availableSorts}
                    onChange={(sorter) => {
                        this.setState({sorter}, () => {
                            this.props.onSortChange(sorter);
                        });
                    }}
                    clearable={false}
                    value={this.state.sorter}
                    placeholder="Sorting"
                />
            </Col>
        );
    }

    render() {
        return (
            <Row>
                { this.getSearchBar() }
                { this.getFilter() }
                { this.getSort() }
            </Row>
        );
    }
};

RSSearchHeader.propTypes = {
    sort: PropTypes.bool,
    filter: PropTypes.bool,
    search: PropTypes.bool,
    onSortChange: PropTypes.func,
    onFilterChange: PropTypes.func,
    onSearch: PropTypes.func,
    availableSorts: PropTypes.array,
    availableFilters: PropTypes.array,
};