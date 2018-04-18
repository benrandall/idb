import React, { Component } from "react";
import { Container, Row } from 'reactstrap';
import ReactPaginate from 'react-paginate';

import CardComponent from "../CardComponent/CardComponent";
import RSSearchHeader from "../RSSearchHeader/RSSearchHeader";
import RSSearchUtils from "../../utilities/RSSearchUtils";

import './CardGrid.css';

export default class CardGrid extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            currentPage: 0,
            visiblePage: 3,
            totalPages: 0
        };

        this.ITEMS_PER_PAGE = 8;
        this.availableSorts = [
            {
                label: `Name (Ascending)`,
                value: RSSearchUtils.directionalSort(RSSearchUtils.sortTitle, true)
            },
            {
                label: `Name (Descending)`,
                value: RSSearchUtils.directionalSort(RSSearchUtils.sortTitle, false)
            },
        ]
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_HOST}/` + this.props.cardType)
            .then((items) => { return items.json() })
            .then((json) => {
                this.setState({
                    items: json.objects,
                    totalPages: Math.ceil(json.objects.length / this.ITEMS_PER_PAGE),
                    currentPage: 0
                });
            });
    }

    searchWithFilters(filters) {
        let anded = {filters: filters.map((item) => item.value)};
        let stringified = JSON.stringify(anded);

        fetch(`${process.env.REACT_APP_API_HOST}/${this.props.cardType}?q=${stringified}`)
            .then((items) => { return items.json() })
            .then((json) => {
                this.setState({
                    items: json.objects,
                    totalPages: Math.ceil(json.objects.length / this.ITEMS_PER_PAGE),
                    currentPage: 0
                });
            });
    }

    handlePageChanged(newPage) {
        this.setState({
            currentPage: newPage
        });
    }

    itemsForPage() {
        let page = this.state.currentPage;
        let data = this.state.items;

        let numItems = this.ITEMS_PER_PAGE;
        let itemsLeft = Math.min(this.ITEMS_PER_PAGE, this.state.items.length - (page * this.ITEMS_PER_PAGE));

        let rows = [];
        let index = (page) * this.ITEMS_PER_PAGE;

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

        return rows;
    }
    
    handleSort(sorter) {
        if (sorter) {
            let temp = this.state.items;
            temp.sort(sorter.value);
            this.setState({ items: temp})
        }
    }

    getFilters() {
        if (this.props.cardType === 'items')
            return RSSearchUtils.getItemFilters();

        return RSSearchUtils.getSkillFilters();
    }

    render() {

        return (
            <Container className="nav-padding">
                <Row> {this.props.cardType === 'items' ? (<h1 className="mx-auto">Runescape Items</h1>) : (<h1 className="mx-auto">Runescape Skills</h1>)}</Row>
                { this.state.items.length === 0 ? (
                    <div className="nav-padding">
                        <RSSearchHeader sort availableSorts={this.availableSorts} onSortChange={(sorter) => this.handleSort(sorter)}
                                    filter availableFilters={this.getFilters()} onFilterChange={(filters) => this.searchWithFilters(filters)}/><hr/>
                        <Row className='nav-padding'>
                            <h4 className='mx-auto'>No results for selected filters</h4>
                        </Row>
                    </div>
                ) : (<div className="nav-padding">
                    <RSSearchHeader sort availableSorts={this.availableSorts} onSortChange={(sorter) => this.handleSort(sorter)}
                                filter availableFilters={this.getFilters()} onFilterChange={(filters) => this.searchWithFilters(filters)}/><hr/>
                    {this.itemsForPage().map((row) => {
                    return (
                        <Row>
                            { row }
                        </Row>
                    );
                })}
                <Row>
                    <ReactPaginate
                       initialPage={0}
                       previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<button>...</button>}
                       breakClassName={"break-me"}
                       pageCount={this.state.totalPages}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={(data) => this.handlePageChanged(data.selected)}
                       containerClassName={"pagination mx-auto nav-padding"}
                       pageClassName={"page-item"}
                       pageLinkClassName={"page-link"}
                       activeClassName={"active"}
                       previousClassName={"page-item"}
                       nextClassName={"page-item"}
                       previousLinkClassName={"page-link"}
                       nextLinkClassName={"page-link"}
                        />
                </Row>
                </div>)}
            </Container>
        )
    }
};
