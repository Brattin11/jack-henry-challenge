import { LitElement, html, css } from 'lit-element';
import env from "./env.js"

export class YouTubeVideoCard extends LitElement {
  static get styles() {
    return css`
      .card-container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 8px;
      }
      .aside {
        display: flex;
        flex-direction: column;
      }
      .card-title{
        padding-bottom: 8px;
        margin: 0;
        color: lightgray;
        font-weight: bold;
      }
      .card-information {
        margin: 0;
        color: lightgray;
      }
      .link {
        text-decoration: none;
        color: inherit;
      }
    `;
  }
  static get properties() {
    return {
      video: { type: Object },
      commentCount: { type: Number },
      apiKey: { type: String },
      baseUrl: { type: String },
    };
  }

  constructor() {
    super();
    this.video = {};
    this.commentCount = 0;
    this.apiKey = env.YOUTUBE_API_KEY;
    this.baseUrl = env.YOUTUBE_BASE_URL
  }

  getComments = async () => {
    const res = await fetch(`${this.baseUrl}/videos?part=statistics&id=${this.video.id.videoId}&key=${this.apiKey}`);
    const data = await res.json();
    this.commentCount = data.items[0].statistics.commentCount;
  }

  updated() {
    this.getComments();
  }

  render() {
    return html`
      <div class="card-container">
        <div>
          <img src=${this.video.snippet.thumbnails.medium.url} />
        </div>
        <div class="aside">
          <p class="card-title">
              <a href="https://www.youtube.com/watch?v=${this.video.id.videoId}" target="_blank" class="link">
                  ${this.video.snippet.title}
              </a>
          </p>
          <p class="card-information">${this.video.snippet.description}</p>
          <p class="card-information">Comment count: ${this.commentCount}</p>
        </div>
      </div>
    `
  }

}
customElements.define('youtube-video-card', YouTubeVideoCard);

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class YoutubeSearch extends LitElement {
  static get styles() {
    return css`
      .youtube-container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .search-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        padding: 12px;
      }
      .search-title{
        display: contents;
      }
      .search-input {
        padding: 12px 8px;
        font-size: 16px;
        background-color: #282828;
        border: none;
        color: #F5F5F5;
        border-radius: 4px;
        width: 20vw;
      }
      .search-button {
        padding: 12px 8px;
        font-size: 16px;
        background-color: #F5F5F5;
        border: none;
        border-radius: 4px;
        color: #282828;
        margin-left: 8px;
      }
      .search-button:hover {
        cursor: pointer;
      }
      .results-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 12px;
        padding: 24px 12px;
      }
    `;
  }

  static get properties() {
    return {
      query: { type: String },
      videos: { type: Array },
      apiKey: { type: String },
      baseUrl: { type: String },
    };
  }

  constructor() {
    super();
    this.videos = [];
    this.query = "";
    this.order = "relevance";
    this.apiKey = env.YOUTUBE_API_KEY;
    this.baseUrl = env.YOUTUBE_BASE_URL
  }


  render() {
    return html`
    <div class="youtube-container">
      <div class="search-container">
        <h3 class="search-title">Youtube Search</h3>
        <div>
          <form @submit=${(e) => {
        e.preventDefault();
        this.getVideos()
      }}>

            <input
              type="text"
              .value="${this.query}"
              @input="${this.handleInput}"
              class="search-input"
              placeholder="Type something..."
            />
            <button type="submit" part="button" class="search-button">
              Search
            </button>
          </form>
        </div>
        <div>
          <label for="sort-type">Sort By:</label>
          <select id="sort-type" .value=${this.order} @change=${(e) => {
        this.order = e.target.value;
        this.getVideos();
      }}>
            <option value="relevance">relevance</option>
            <option value="date">date</option>
            <option value="rating">rating</option>
          </select>
        </div>
        <div>
      </div>
    </div>

      <div class="results-container">
      ${this.videos.map(video => {
        return html`
        <youtube-video-card .video=${video}></youtube-video-card>
        `
      })}
      </div>
    </div>
    `;
  }

  getVideos = async () => {
    const res = await fetch(`${this.baseUrl}/search?part=snippet&q=${encodeURIComponent(this.query)}&order=${encodeURIComponent(this.order)}&maxResults=10&type=video&key=${this.apiKey}`)
    const data = await res.json();
    this.videos = data.items;
  }

  handleInput(e) {
    this.query = e.target.value;
  }
}

window.customElements.define('youtube-search', YoutubeSearch);
