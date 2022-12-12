import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DefaultResultsComponent from './SearchResults/DefaultResultsComponent';//---

import './css/NormalViewComponent.css';

export default class NormalViewComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      facets: [],
      results: {},
    };
  }

  render(){
    const { resultInfo, results } = this.props;

    return (
      <>
        {
          // (this.props.data.facets && defaults.facetFiltersType !== "OR") && <AdvancedFilters facets={this.props.data.facets}/>
          // <TuningRangeSelector/>
        }
        <div id="results-container">
            <DefaultResultsComponent results={results} resultInfo={resultInfo}/>
        </div>
      </>
    );
  }
}

NormalViewComponent.propTypes = {
  resultInfo: PropTypes.object,
  results: PropTypes.array,
};
