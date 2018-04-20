import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import ReactPaginate from 'react-paginate';

import RSVideoCard from '../RSVideoCard/RSVideoCard';
import RSRedditCard from "../RSRedditCard/RSRedditCard";
import RSSearchHeader from "../RSSearchHeader/RSSearchHeader";
import RSSearchUtils from "../../utilities/RSSearchUtils";
import RSDataUtils from '../../utilities/RSDataUtils';

export default class CommunityGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loaded: false,
            currentPage: 0,
            totalPages: 0,
            sorter: null,
        };

        this.ITEMS_PER_PAGE = 9;
        this.ROW_SIZE = 3;
    }

    componentDidMount() {
        RSSearchUtils.request(`videos`)
            .then((json) => {
                this.setState({
                    items: json.objects
                });
                return RSSearchUtils.request(`reddits`);
            })
            .then((json) => {
                this.updateFromRequest(json);
            });
    }

    /** MARK: - State Handling  */

    handlePageChanged(page) {
        this.setState({
            currentPage: page
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

    updateFromRequest(response) {
        let results = this.state.items.concat(response.objects);
        if (this.state.sorter) {
            results.sort(this.state.sorter.value);
        }

        this.setState({
            items: results,
            loaded: true,
            totalPages: Math.ceil(results.length / this.ITEMS_PER_PAGE),
            currentPage: 0
        })
    }

    searchWithFilters(filters) {
        RSSearchUtils.requestWithFilters(`videos`, filters)
            .then((json) => {
                this.setState({
                    items: json.objects
                });
                return RSSearchUtils.requestWithFilters(`reddits`, filters);
            })
            .then((json) => {
                this.updateFromRequest(json);
            });
    }

    getSearchHeader() {
        return (
            <div className="nav-padding">
                <RSSearchHeader sort
                                availableSorts={RSSearchUtils.getAdvancedSorts()}
                                onSortChange={(sorter) => this.handleSort(sorter)}
                                filter
                                availableFilters={RSSearchUtils.getCommunityFilters()}
                                onFilterChange={(filters) => this.searchWithFilters(filters)}/>
                <hr/>
            </div>
        );
    }

    itemsForCurrentPage() {
        let data = this.state.items.map((item) => {
            if (item.video_url) {
                return <RSVideoCard icon={item.icon}
                                    key={`${item.id}.${item.name}`}
                                    id={item.id}
                                    title={item.name}/>
            }
            return <RSRedditCard title={item.title}
                                 key={item.url}
                                 url={item.url}/>
        });

        return RSDataUtils.groupItems(data, this.ITEMS_PER_PAGE, this.state.currentPage, this.ROW_SIZE);
    }

    /** MARK: - UI Creation */

    getContent() {
        return (
            <Row>
            {  this.state.items.length > 0
                ? (
                    <Row>
                        { this.itemsForCurrentPage() }
                    </Row>
                ) : (
                    <Row>
                        <h4 className='mx-auto'>No results for selected filters</h4>
                    </Row>
                )
            }
            </Row>
        );
    }

    render() {
        if (!this.state.loaded) {
            return (<Row className="nav-padding"><h2 className="mx-auto">Loading...</h2></Row>);
        }

        return (
            <Container className="nav-padding">
                <Row><h1 className="mx-auto">Runescape Community Resources</h1></Row>
                { this.getSearchHeader() }
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
        );
    }
};
