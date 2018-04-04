import React, { Component } from "react";
import { Container, Row } from 'reactstrap';
import ReactPaginate from 'react-paginate';

import CardComponent from "../CardComponent/CardComponent";
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

        this.ITEMS_PER_PAGE = 3;
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_HOST}/` + this.props.cardType)
            .then((items) => { return items.json() })
            .then((json) => {
                this.setState({
                    items: json.objects,
                    totalPages: Math.ceil(json.objects.length / this.ITEMS_PER_PAGE)
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

    render() {

        if (this.state.items.length === 0) {
            return (<div></div>);
        }

        return (
            <Container>
                {this.itemsForPage().map((row) => {
                    return (
                        <Row className="nav-padding">
                            { row }
                        </Row>
                    );
                })}
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
                       containerClassName={"pagination"}
                       pageClassName={"page-item"}
                       pageLinkClassName={"page-link"}
                       activeClassName={"active"}
                       previousClassName={"page-item"}
                       nextClassName={"page-item"}
                       previousLinkClassName={"page-link"}
                       nextLinkClassName={"page-link"}
                />
            </Container>
        )
    }
};
