import * as React from 'react';
import styles from './index.css';
<% const className = `${camelEntityName}Class` %>
const {
  <%= pascalEntityName %>: <%= className %>
} = styles;
<% const props = `${pascalEntityName}Props` %>
interface <%= props %> {

}

const <%= pascalEntityName %> = (
  {

  }: <%= props %>
) => (
  <div className={<%= className %>}>

  </div>
);

export default <%= pascalEntityName %>;
