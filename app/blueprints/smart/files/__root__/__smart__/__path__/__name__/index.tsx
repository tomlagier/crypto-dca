import React, { Component } from 'react';
import styles from './index.css';
import { connect } from 'react-redux';
<% const className = `${camelEntityName}Class` %>
const {
  <%= pascalEntityName %>: <%= className %>
} = styles;
<% const props = `${pascalEntityName}Props` %>
interface <%= props %> {

}
<% const state = `${pascalEntityName}State` %>
interface <%= state %> {

}

// graphQL query and selector

// Redux selectors
const mapStateToProps = () => ({});
const mapDispatchToProps = (
  dispatch: Function,
  // merged graphQL and own props
) => ({});

class <%= pascalEntityName %> extends Component <<%= props %>, <%= state %>> {
  render() {
    return (
      <div className={<%= className %>}>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= pascalEntityName %>);
