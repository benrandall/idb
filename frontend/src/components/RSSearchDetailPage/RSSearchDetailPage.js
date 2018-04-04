import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RSSearchHeader from "../RSSearchHeader/RSSearchHeader";
import RSSearchCard from "../RSSearchCard/RSSearchCard";
import ReactPaginate from 'react-paginate';
import RSSearchUtils from '../../utilities/RSSearchUtils';

export default class RSSearchDetailPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            hasMore: false,
            loaded: false,
            query: '',
            currentPage: 0,
            totalPages: 0
        };

        this.ITEMS_PER_PAGE = 9;

        this.availableSorts = [
            {
                label: `Name (Ascending)`,
                value: RSSearchUtils.directionalSort(RSSearchUtils.sortTitle, true)
            },
            {
                label: `Name (Descending)`,
                value: RSSearchUtils.directionalSort(RSSearchUtils.sortTitle, false)
            },
            {
                label: `Type (Ascending)`,
                value: RSSearchUtils.directionalSort(RSSearchUtils.sortType, true)
            },
            {
                label: `Type (Descending)`,
                value: RSSearchUtils.directionalSort(RSSearchUtils.sortType, false)
            }
        ]
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.search(params.query);
    }

    itemsForCurrentPage() {

        let data = this.state.results;
        let page = this.state.currentPage;

        let numItems = this.ITEMS_PER_PAGE;
        let itemsLeft = Math.min(this.ITEMS_PER_PAGE, data.length - (page * this.ITEMS_PER_PAGE));

        let rows = [];
        let index = (page) * this.ITEMS_PER_PAGE;

        let numRows = Math.ceil(numItems / 4);

        for (let i = 0; i < numRows; i++) {
            let row = [];

            for(let j = 0; j < 4 && itemsLeft > 0; j++) {
                let result = data[index++];

                if (result.reddits && result.videos && result.skills) {
                row.push(<RSSearchCard id={result.id}
                                     title={result.name}
                                     body={result.examine_info}
                                     searchWords={this.state.query.split(' ')}
                                     imageURL={result.icon}
                                     type="items"
                                        />)
                }
                // Is a Skill
                else if (result.reddits && result.videos && result.items) {
                    row.push(<RSSearchCard id={result.id}
                                          imageURL={result.icon}
                                          searchWords={this.state.query.split(' ')}
                                          body={result.description}
                                          title={result.name}
                                          type="skills"/>)
                }
                else if (result.video_url) {

                    row.push(<RSSearchCard id={result.id}
                                         imageURL={result.icon}
                                         title={result.name}
                                         searchWords={this.state.query.split(' ')}
                                         type="videos"/>);

                    //return <RSVideoCard title={result.name} icon={result.icon} id={result.id}/>
                }
                // Is a reddit item
                else if (result.skills && result.items) {

                    row.push(<RSSearchCard id={result.id}
                                         imageURL={`${process.env.REACT_APP_API_HOST}/images/reddit-logo.jpg`}
                                         searchWords={this.state.query.split(' ')}
                                         title={result.title}
                                         externalURL={result.url}/>);
                } else {
                    row.push(<h1>ERROR</h1>);
                }

                --itemsLeft;
            }

            rows.push(row);
        }

        return rows;
    }

    handlePageChanged(newPage) {
        this.setState({
            currentPage: newPage
        });
    };

    render() {

        if (!this.state.loaded) {
            return (<p>Loading</p>);
        }

        return (
            <Container>
                <Row>
                    <Col sm="12">
                        <RSSearchHeader search sort
                                        handler={(value) => this.handleSearch(value)}
                                        onSortChange={(sorters) => this.handleSort(sorters)}
                                        availableSorts={this.availableSorts}/>
                    </Col>
                </Row>
                <Row>
                    { this.itemsForCurrentPage() }
                </Row>
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
                       containerClassName={"pagination"}
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

    handleSearch(value) {
        this.props.history.push(`/search/${value}`);
        this.search(value);
    }

    handleSort(sorter) {
        let temp = this.state.results;
        temp.sort(sorter.value);

        this.setState({
            results: temp
        });
    }

    search(value) {
        fetch(`${process.env.REACT_APP_API_HOST}/search?q=${value}&`)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    results: json.result,
                    hasMore: json.has_more,
                    loaded: true,
                    query: value,
                    totalPages: Math.ceil(json.result.length / this.ITEMS_PER_PAGE)
                });
            })
    }
}