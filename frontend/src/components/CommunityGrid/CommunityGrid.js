import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import ReactPaginate from 'react-paginate';

import RSVideoCard from '../RSVideoCard/RSVideoCard';
import RSRedditCard from "../RSRedditCard/RSRedditCard";

export default class CommunityGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            reddits: [],
            video_loaded: false,
            reddit_loaded: false,
            currentPage: 0,
            totalPages: 0
        };

        this.ITEMS_PER_PAGE = 9;
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_HOST}/videos`)
        .then(response => response.json())
        .then(response => {
          this.setState({
            videos: response.objects,
            video_loaded: true
          });
          return fetch(`${process.env.REACT_APP_API_HOST}/reddits`)
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            reddits: response.objects,
            reddit_loaded: true,
            totalPages: Math.ceil((this.state.videos.length + response.objects.length) / this.ITEMS_PER_PAGE)
          })
        });
    }

    itemsForCurrentPage() {
        let videos = this.state.videos.map((item) => {
            return <RSVideoCard icon={item.icon}
                              id={item.id}
                              title={item.name}/>;
        });

        let reddits = this.state.reddits.map((item) => {
            return <RSRedditCard title={item.title}
                              url={item.url}/>
        });

        let data = videos.concat(reddits);
        let page = this.state.currentPage;

        let numItems = this.ITEMS_PER_PAGE;
        let itemsLeft = Math.min(this.ITEMS_PER_PAGE, data.length - (page * this.ITEMS_PER_PAGE));

        let rows = [];
        let index = (page) * this.ITEMS_PER_PAGE;

        let numRows = Math.ceil(numItems / 4);

        for (let i = 0; i < numRows; i++) {
            let row = [];

            for(let j = 0; j < 4 && itemsLeft > 0; j++) {
                row.push(data[index++]);
                --itemsLeft;
            }

            rows.push(row);
        }

        return rows;
    }

    handlePageChanged(page) {
        this.setState({
            currentPage: page
        });
    }

    render() {
        if (!this.state.video_loaded && !this.state.reddit_loaded) {return <p>Loading</p>}

        return (
            <Container>
                <Row className="nav-padding">
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
};
