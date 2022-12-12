import React, { Component } from 'react';
import * as qs from 'query-string';
import PropTypes from 'prop-types';

import * as parser from '../Common/SbCore';
import { sortButtons } from '../Common/Defaults';
import { Button, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,UncontrolledTooltip } from 'reactstrap';

import '../css/low_level_components/sort_component.css';

export default class SortComponent extends Component{

  constructor(){
    super();
    this.state = {
      showDropdown: false
    };
    this.doSort = this.doSort.bind(this);
  }

  doSort(sort,e){
    e.preventDefault();
    document.getElementById("myDropdown").classList.remove("show");
    document.getElementById("caret").classList.remove("open");
    let urlParameters = Object.assign({}, qs.parse(window.location.search));
    if(sort.sort && !sort.sort1){
      sortButtons.map((sortVal,key) => {
        if(sortVal.sort) {
          urlParameters.sort = sortVal.field;
          urlParameters.sortdir = sortVal.sortDir ? sortVal.sortDir : "desc";
        }
        if(sortVal.sort1) {
          urlParameters.sort1 = sortVal.field;
          urlParameters.sortdir1 = sortVal.sortDir ? sortVal.sortDir : "desc";
        }
      });
    }
    else{
      delete urlParameters.sort1;
      delete urlParameters.sortdir1;
      urlParameters.sort = sort.field;
      urlParameters.sortdir = sort.sortDir ? sort.sortDir : "desc";
    }
    urlParameters.page = 1;
    this.setState({
      showDropdown: false
    });
    parser.getResults(urlParameters);
  }

  render(){
    let urlParameters = Object.assign({}, qs.parse(window.location.search));
    const style1={
      textDecoration: 'none',
      color:'#000',
      pointerEvents:'none'
    };
    const style2={
      color: '#0a4a69',
      cursor:'pointer',
    };
    const style3={
      cursor:'text'
    };
    const style4={
      cursor:'pointer'
    };

    return(


          sortButtons.map((sortbutton, index) => {
            return <a href="" key={`sortButton${index}}`} title={sortbutton.display} className="dd-heading"  onClick={(e) => this.doSort(sortbutton,e)}>
              {sortbutton.display}
            </a>;
          })


    );
  }
}

SortComponent.propTypes = {
  sort: PropTypes.string,
  sortdir: PropTypes.string
};
