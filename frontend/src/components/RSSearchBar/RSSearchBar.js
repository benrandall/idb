import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from 'react-search-bar';

import './RSSearchBar.css';

const RSSearchBar = (props) => {
    return <SearchBar   renderClearButton
                        renderSearchButton
                        placeholder="Search"
                        suggestions={[]}
                        onClear={props.onClear}
                        onChange={props.onChange}
                        onSearch={props.onSearch}
                    />
};

RSSearchBar.propTypes = {
    onSearch: PropTypes.func,
    onClear: PropTypes.func,
    onChange: PropTypes.func
};

export default RSSearchBar;