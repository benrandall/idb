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
            sorter: {}
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
            <Row>
                {   this.props.search &&
                    <Col sm={12} md={4}>
                        <RSSearchBar onSearch={ (value) => this.props.onSearch
                                                            ? this.props.onSearch(value)
                                                            : this.fieldDidSearch(value) }
                                     onClear={this.fieldDidClear}
                                     onChange={this.fieldDidChange}
                        />
                    </Col>
                }
                {   this.props.filter &&
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
                }
                {
                    this.props.sort &&
                    <Col sm={12} md={4}>
                        <h5>Sort by:</h5>
                        <Select options={this.state.availableSorts}
                            onChange={(sorter) => {
                                this.setState({sorter}, () => {
                                    this.props.onSortChange(sorter);
                                });
                            }}
                            value={this.state.sorter}
                            placeholder="Sorting"
                        />
                    </Col>
                }
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