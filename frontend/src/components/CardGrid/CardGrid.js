import React, { Component } from "react";
import { Container, Row } from 'reactstrap';
import ReactPaginate from 'react-paginate';

import CardComponent from "../CardComponent/CardComponent";
import RSSearchHeader from "../RSSearchHeader/RSSearchHeader";
import RSSearchUtils from "../../utilities/RSSearchUtils";
import RSDataUtils from "../../utilities/RSDataUtils";

import './CardGrid.css';

export default class CardGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentPage: 0,
            visiblePage: 3,
            totalPages: 0,
            sorter: null
        };

        this.ITEMS_PER_PAGE = 8;
        this.PATH = props.cardType;
    }

    componentDidMount() {
        RSSearchUtils.request(this.PATH)
            .then((json) => this.updateFromRequest(json));
    }

    /** MARK: - State Handling  */

    updateFromRequest(json) {
        let result = json.objects;
        if (this.state.sorter) {
            result.sort(this.state.sorter.value);
        }


        this.setState({
            items: result,
            totalPages: Math.ceil(json.objects.length / this.ITEMS_PER_PAGE),
            currentPage: 0
        });
    }

    searchWithFilters(filters) {
        RSSearchUtils.requestWithFilters(this.PATH, filters)
            .then((json) => this.updateFromRequest(json));
    }

    handlePageChanged(newPage) {
        this.setState({
            currentPage: newPage
        });
    }

    itemsForPage() {
        let data = this.state.items.map((item) => {
            return <CardComponent key={item.id} item={item} cardType={this.props.cardType} showFooter={true}/>
        });

        return RSDataUtils.groupItems(data, this.ITEMS_PER_PAGE, this.state.currentPage).map((row, index) => {
            return (
                <Row key={`gridrow${index}`}>
                    { row }
                </Row>
            );
        });
    }

    handleSort(sorter) {
        this.setState({sorter: sorter}, () => {
            if (sorter) {
                let temp = this.state.items;
                temp.sort(sorter.value);
                this.setState({items: temp});
            }
        });
    }

    getFilters() {
        if (this.props.cardType === 'items')
            return RSSearchUtils.getItemFilters();

        return RSSearchUtils.getSkillFilters();
    }

    /** MARK: - UI Creation */

    getTitle() {
        return (
            <Row>
                {
                this.props.cardType === 'items'
                    ? (<h1 className="mx-auto">Runescape Items</h1>)
                    : (<h1 className="mx-auto">Runescape Skills</h1>)
                }
            </Row>
        )
    }

    getSearchHeader() {
        return (
            <RSSearchHeader sort
                            availableSorts={RSSearchUtils.getStandardSorts()}
                            onSortChange={(sorter) => this.handleSort(sorter)}
                            filter
                            availableFilters={this.getFilters()}
                            onFilterChange={(filters) => this.searchWithFilters(filters)}/>
        );
    }

    getContent() {
        if (this.state.items.length === 0) {
            return (
                <div className="nav-padding">
                    { this.getSearchHeader() }
                    <hr/>
                    <Row className='nav-padding'>
                        <h4 className='mx-auto'>No results for selected filters</h4>
                    </Row>
                </div>
            )
        }

        return (
            <div className="nav-padding">
                { this.getSearchHeader() }
                <hr/>
                { this.itemsForPage() }
            </div>
        )
    }

    render() {
        return (
            <Container className="nav-padding">
                { this.getTitle() }
                { this.getContent() }
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
            </Container>
        )
    }
};
