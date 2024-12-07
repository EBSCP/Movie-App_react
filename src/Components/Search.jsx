import React from "react";
import "./Search.css";
import PropTypes from "prop-types";

function Search({ searchInput, search }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for a Movie..."
                className="search"
                onChange={searchInput}
                onKeyPress={search}
            />
        </div>
    );
}

Search.propTypes = {
    searchInput: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
};

export default Search;
