import React from 'react';
import SearchInput from "../search-input"
import "./index.scss"
import SearchResults from '../search-results';


const YoutubeSearch = () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const [searchQuery, setSearchQuery] = React.useState(query);
    const [videos, setVideos] = React.useState([]);
    const [sortType, setSortType] = React.useState("relevance");

    const searchVideos = async (order = sortType) => {
        const res = await fetch(`${process.env.REACT_APP_YOUTUBE_BASE_URL}/search?part=snippet&q=${encodeURIComponent(searchQuery)}&order=${encodeURIComponent(order)}&maxResults=10&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        const data = await res.json();
        setVideos(data.items)
    }

    return (
        <div className="youtube-container">

            <SearchInput setSearchQuery={setSearchQuery} searchQuery={searchQuery} searchVideos={searchVideos} setSortType={setSortType} sortType={sortType} />
            {videos?.length > 0 && <SearchResults videos={videos} />}
        </div>
    )
}

export default YoutubeSearch