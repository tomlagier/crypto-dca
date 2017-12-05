import React, { Component } from 'react';
import styles from './index.css';
import { withApollo, compose } from 'react-apollo';
import { connect } from 'react-redux';

const {
  Page: pageClass
} = styles;

interface PageProps {

}

interface PageState {

}

// graphQL query and selector

// Redux selectors
const mapStateToProps = () => ({});
const mapDispatchToProps = (
  dispatch: Function,
  // merged graphQL and own props
) => ({});

class Page extends Component <PageProps, PageState> {
  render() {
    return (
      <div className={pageClass}>
        A page
      </div>
    );
  }
}

export default compose(
  withApollo,
  // graphql selector
  connect(mapStateToProps, mapDispatchToProps)
)(Page);
