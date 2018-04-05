import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'react-search-bar';
import { withRouter } from 'react-router-dom';

import './RSSearchBar.css';

const RSSearchBar = (props) => {
    return <SearchBar renderClearButton
                      renderSearchButton
                      placeholder="Search"
                      suggestions={[]}
                      onClear={props.onClear}
                      onChange={props.onChange}
                      onSearch={(value) => {
                          if (props.onSearch) {
                              props.onSearch(value);
                          } else {
                              props.history.push(`/search/${value}`)
                          }
                      }}
    />
};

RSSearchBar.propTypes = {
    onSearch: PropTypes.func,
    onClear: PropTypes.func,
    onChange: PropTypes.func
};


export default withRouter(RSSearchBar);