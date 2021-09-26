import React from 'react';
import ReactPaginate from 'react-paginate';

const MARGIN_RANGE_DISPLAYED = 1;
const PAGE_RANGE_DISPLAYED = 2;

class paginateComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  paginate = () => {
    var items = this.props.items;
    var reactPagenate;
    if(items === undefined || items === null || items.length <= 0) {
      reactPagenate = null;
    } else {
      reactPagenate = (
        <ReactPaginate
          pageCount={items.length} 
          pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
          marginPagesDisplayed={MARGIN_RANGE_DISPLAYED}
          onPageChange={this.props.pageChange}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          activeLinkClassName="active"
          previousLinkClassName="previous-link"
          nextLinkClassName="next-link"
          previousLabel="<"
          nextLabel=">"
          breakLabel='...'
          disabledClassName="disabled-button"
        />
      )
    }
    return reactPagenate
  }

  render() {
    return this.paginate();
  }
}

export default paginateComponent;