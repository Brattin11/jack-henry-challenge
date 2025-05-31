import React from "react"
import "./index.scss"


const VideoCard = ({ video }) => {
    const [commentCount, setCommentCount] = React.useState(0);
    React.useEffect(() => {
        const getCount = async () => {
            const res = await fetch(`${process.env.REACT_APP_YOUTUBE_BASE_URL}/videos?part=statistics&id=${video.id.videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
            const data = await res.json();
            setCommentCount(data.items[0].statistics.commentCount);
        }
        getCount();
    }, [video])

    return (
        <div className="card-container">
            <img src={video.snippet.thumbnails.medium.url} />
            <div className="aside">
                <p className="title">
                    <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank">
                        {video.snippet.title}
                    </a>
                </p>
                <p>{video.snippet.description}</p>
                <p>Comment count: {commentCount}</p>
            </div>
        </div>
    )
}

export default VideoCard;