import React from 'react';
import ReactPaginate from 'react-paginate';

const MAX_PAGE_VIDEOS_COUNT = 10;
const MARGIN_RANGE_DISPLAYED = 2;
const PAGE_RANGE_DISPLAYED = 3;

class paginateComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: this.setVideos(props.videos),
      displayPages: [],
      selectPage: 0, //最初は0番目(=最新)の要素から
    }
  }

  setVideos = (videos) => {
    debugger
    var maxRange = MAX_PAGE_VIDEOS_COUNT;
    var sliceVideos = []
    if (videos.length) {
      for ( let i = 0; i < videos.length; i = i + MAX_PAGE_VIDEOS_COUNT ) {
        sliceVideos.push(videos.slice(i, maxRange));
        maxRange = maxRange + MAX_PAGE_VIDEOS_COUNT
      }
    }
    return sliceVideos
  }

  render() {
    return (
      <div>
        <ReactPaginate
          pageCount={this.state.videos.length} 
          marginPagesDisplayed={MARGIN_RANGE_DISPLAYED}
          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
          onPageChange={handlePaginate} //todo
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          activeLinkClassName="active"
          previousLinkClassName="previous-link"
          nextLinkClassName="next-link"
          previousLabel={arrowIcon('left')}
          nextLabel={arrowIcon('right')}
          disabledClassName="disabled-button"
        />
      </div>
    );
}

export default paginateComponent;