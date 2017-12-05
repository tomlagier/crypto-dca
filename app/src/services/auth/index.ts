import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export interface User {
  name: string;
  avatar: string;
}

interface CurrentUserProps {
  data?: {
    loading?: boolean;
    currentUser?: User;
  };
}

const CURRENT_USER = gql`query { currentUser { id name avatar }}`;
export const withUser = graphql<Response, CurrentUserProps>(CURRENT_USER, {
  props: ({ data: { loading, currentUser } }: CurrentUserProps) =>
    ({ loading, user: currentUser })
});