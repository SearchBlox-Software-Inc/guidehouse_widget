/*
  CURRNET PAGE, LAST PAGE ARE THE REQUIRED PROPS FOR THIS COMPONENT
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import * as parser from '../Common/SbCore.js';
import * as $ from 'jquery';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import '../css/low_level_components/pagination/pagination_with_page_numbers.css';

export default class PaginationWithPageNumbers extends Component {
  constructor() {
    let urlParameters = Object.assign({}, qs.parse(window.location.search));
    super();
    this.state = {
      pagesArray: [],
      currentPageState: urlParameters.page,
      lastPageValue: "",
    };
    this.currentPage.bind(this);
    this.keydown.bind(this);
    this.getPage = this.getPage.bind(this);
    this.showValue = this.showValue.bind(this);
    this.handlePageInput = this.handlePageInput.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let pagesArray = [];
    let lastPageValue;
    // console.log(props.currentpage)
    if (props.lastpage) {
      lastPageValue = props.lastpage.toString();
    }

    if (props.currentpage <= 3) {
      let i = 1;
      let max = 5;
      (props.lastpage > 5) ? (max = 5) : (max = props.lastpage);
      while (i <= max) {
        pagesArray.push(i);
        i++;
      }
    }
    else if (props.currentpage >= (props.lastpage - 2)) {
      let i = props.currentpage - 2;
      while (i <= props.lastpage) {
        pagesArray.push(i);
        i++;
      }
    }
    else {
      let i = props.currentpage - 2;
      while (i < props.currentpage + 3) {
        pagesArray.push(i);
        i++;
      }
    }
    return {
      ...state,
      pagesArray,
      lastPageValue
    };
  }

  getPage(e, page) {
    e.preventDefault();
    let urlParameters = Object.assign({}, qs.parse(window.location.search));
    if (urlParameters.mlt_id) {
      urlParameters.XPC = page;
    }
    urlParameters.page = page;
    parser.getResults(urlParameters);
  }

  keydown(e, page) {
    if (e.keyCode === 13) {
      if (parseInt(e.target.value) > parseInt(this.state.lastPageValue)) {
        page = this.state.lastPageValue;
        this.getPage(e, page);
      } else {
        this.getPage(e, page);
      }
    }

  }
  currentPage(e) {
    e.preventDefault();
    return false;
  }
  handlePageInput(e) {
    let value = e.target.value;
    this.setState({ currentPageState: value });
  }
  showValue(e) {
    let value = e.target.value;
    if (value === "") {
      this.setState({ currentPageState: this.props.currentpage });
    }

  }
  render() {
    let { lastpage, currentpage } = this.props;
    let { currentPageState, currentPageValue } = this.state;
    let urlParameters = Object.assign({}, qs.parse(window.location.search));
    if (lastpage !== 1) {
      return (
        <Pagination aria-label="Page navigation">
          {
            (1 === currentpage)
              ?
              <PaginationItem>
                <PaginationLink href="#" title="Previous" onClick={(e) => e.preventDefault()}>
                  <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1875 1L1 12L14.1905 23" stroke="#7B7B7B" />
                  </svg>
                </PaginationLink>
              </PaginationItem>
              :
              <PaginationItem>
                <PaginationLink href="#" title="Previous" onClick={(e) => this.getPage(e, currentpage - 1)}>
                  <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1875 1L1 12L14.1905 23" stroke="#1B1B1B" />
                  </svg>
                </PaginationLink>
              </PaginationItem>
          }
          <PaginationItem >
            <input className="pagination-input pagination-current-page" aria-label={currentpage.toString()} value={currentPageState} style={{ "width": (currentPageState.length + 2) + "ch", "minWidth": "3ch" }} onChange={(e) => this.handlePageInput(e)} onKeyDown={(e) => this.keydown(e, currentPageState)} type="number" onBlur={this.showValue} />
          </PaginationItem>
          <p>of</p>
          <PaginationItem className="last-page">
            <PaginationLink className="page-link" href="#" aria-label={lastpage.toString()} title={lastpage} onKeyDown={(e) => this.keydown(e, currentpage)} onClick={(e) => { (urlParameters.page === currentpage || urlParameters.page === currentpage.toString()) ? this.currentPage(e) : null }} tabIndex={`${(urlParameters.page === currentpage || urlParameters.page === currentpage.toString()) ? "-1" : "0"}`}>{lastpage}
            </PaginationLink>
          </PaginationItem>
          {
            (lastpage === currentpage)
              ?
              null
              :
              <PaginationItem>
                <PaginationLink href="#" title="Next" onClick={(e) => this.getPage(e, currentpage + 1)}>
                  <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.1875 23L14.375 12L1.18455 0.999999" stroke="#1B1B1B" />
                  </svg>
                </PaginationLink>
              </PaginationItem>
          }
        </Pagination>
      );
    } else {
      return null;
    }
  }
}

PaginationWithPageNumbers.propTypes = {
  currentpage: PropTypes.number,
  lastpage: PropTypes.number
};
