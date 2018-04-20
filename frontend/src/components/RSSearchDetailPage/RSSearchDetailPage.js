import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RSSearchHeader from "../RSSearchHeader/RSSearchHeader";
import ReactPaginate from 'react-paginate';
import RSSearchUtils from '../../utilities/RSSearchUtils';
import Masonry from 'react-masonry-component';
import RSDataUtils from "../../utilities/RSDataUtils";

export default class RSSearchDetailPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            hasMore: false,
            loaded: false,
            query: '',
            currentPage: 0,
            totalPages: 0,
            sorter: null
        };

        this.ITEMS_PER_PAGE = 9;
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.search(params.query);
    }

    componentWillReceiveProps(props) {
        const { match: { params } } = props;
        this.setState({
            sorter: null
        });
        this.search(params.query);
    }

    /** MARK: - State Handling  */

    search(query) {
        RSSearchUtils.request(`search?q=${query}&`)
            .then((json) => {
                this.updateFromRequest(json, query)
            });
    }

    handlePageChanged(newPage) {
        this.setState({
            currentPage: newPage
        });
    };

    handleSearch(value) {
        this.props.history.push(`/search/${value}`);
    }

    handleSort(sorter) {
        this.setState({sorter: sorter}, () => {
            if (sorter) {
                let temp = this.state.results;
                temp.sort(sorter.value);
                this.setState({results: temp});
            }
        });
    }


    updateFromRequest(json, query) {
        let result = json.result;
        if (this.state.sorter) {
            result.sort(this.state.sorter.value);
        }

        this.setState({
            results: result,
            hasMore: json.has_more,
            loaded: true,
            query: query,
            totalPages: Math.ceil(json.result.length / this.ITEMS_PER_PAGE),
            currentPage: 0
        });
    }

    itemsForCurrentPage() {
        let data = this.state.results.map((data) => {
            return RSDataUtils.createComponentFromData(data, this.state.query)
        });

        let page = RSDataUtils.groupItems(data, this.ITEMS_PER_PAGE, this.state.currentPage);
        const masonryOptions = {
            transitionDuration: 0
        };

        return (
            <Masonry
                    className={'masonry-grid'}
                    elementType={'div'}
                    options={masonryOptions}
                    disableImagesLoaded={false}
                    updateOnEachImageLoad={false}
                >
                    { page }
            </Masonry>
        )
    }

    /** MARK: - UI Creation */

    getContent() {
        if (this.state.results.length === 0) {
            return (
                <Row className='nav-padding'>
                    <h4 className='mx-auto'>No search results for '{ this.state.query }'</h4>
                </Row>
            );
        }

        return (
            <div>
                <Row className='nav-padding'>
                    <h4 className='mx-auto'>Search results for '{ this.state.query }'</h4>
                </Row>
                <Row className="nav-padding">
                    <Col sm="12">
                        <RSSearchHeader sort
                                        onSearch={(value) => this.handleSearch(value)}
                                        onSortChange={(sorters) => this.handleSort(sorters)}
                                        availableSorts={RSSearchUtils.getAdvancedSorts()}
                                        availableFilters={RSSearchUtils.getModelFilters()}
                                        />
                    </Col>
                </Row>
                <hr/>
                { this.itemsForCurrentPage() }
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
            </div>
        );
    }

    render() {
        if (!this.state.loaded) {
            return (<Row className="nav-padding"><h2 className="mx-auto">Loading...</h2></Row>);
        }

        return (
            <Container>
                { this.getContent() }
            </Container>
        );

    }
}