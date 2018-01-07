import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { mutate } from '../../graphql';

export interface Option {
  id: string;
  name: string;
  value: string;
}

export interface OptionsProps {
  data?: {
    loading?: boolean;
    options?: Option[];
  };
}

export const optionFields = `
  id
  name
  value
`;

// graphQL query and selector
export const OPTIONS = gql`
  query options($names: [String]!) {
    options(names: $names) {
      ${optionFields}
    }
  }
`;

export const withOptions = (names: string[]) =>
  graphql<Response, OptionsProps>(OPTIONS, {
    options: { variables: { names } },
    props: ({
      data: { loading, options: resultOptions }
    }: OptionsProps) => ({
      loading,
      options: resultOptions
    })
  });

// Upsert
interface UpsertOptionsArgs {
  options: {
    id?: string;
    name: string;
    value: string;
  }[];
}

interface UpsertOptionsResult {
  data?: {
    upsertOptions?: Option[];
  };
}

const UPSERT_OPTIONS = gql`
  mutation upsertOptions($options: [InputOption]!) {
    upsertOptions(options: $options) {
      ${optionFields}
    }
  }
`;

export const updateOptions = ({
  options
}: UpsertOptionsArgs) =>
  mutate({
    mutation: UPSERT_OPTIONS,
    variables: {
      options
    },
    update: (
      proxy,
      { data: { upsertOptions } }: UpsertOptionsResult
    ) => {
      const names = options.map(option => option.name);
      const optionsQuery = proxy.readQuery({
        query: OPTIONS,
        variables: { names }
      }) as { options: Option[] };

      const nextOptions = [...optionsQuery.options];

      upsertOptions.forEach(option => {
        let updatedOption = false;
        optionsQuery.options.forEach((localOption, i) => {
          if (localOption.name === option.name) {
            nextOptions[i] = option;
            updatedOption = true;
          }
        });

        if (!updatedOption) {
          nextOptions.push(option);
        }
      });

      optionsQuery.options = nextOptions;

      proxy.writeQuery({
        query: OPTIONS,
        variables: { names },
        data: optionsQuery
      });
    }
  });
