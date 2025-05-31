import React from "react";
import "./index.scss"

const SearchInput = ({ setSearchQuery, searchVideos, setSortType, sortType, searchQuery }) => {

    return (
        <div className="search-container">
            <h3>Youtube Search</h3>
            <div>
                <div className="input-section">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        searchVideos();
                    }
                    }>
                        <input placeholder="Type something..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div>
                <label htmlFor="sort-type">Sort By:</label>
                <select id="sort-type" value={sortType} onChange={(e) => {
                    setSortType(e.target.value);
                    searchVideos(e.target.value);
                }}>
                    <option value="relevance">relevance</option>
                    <option value="date">date</option>
                    <option value="rating">rating</option>
                </select>
            </div>
        </div>
    )
}

export default SearchInput;