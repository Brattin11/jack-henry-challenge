import React from "react";
import VideoCard from "../video-card";
import "./index.scss";

const SearchResults = ({ videos }) => {
    return (
        <div className="results-container">
            {
                videos.map(video => <VideoCard video={video} />)
            }
        </div>
    )
}

export default SearchResults;