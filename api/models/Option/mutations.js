const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList
} = require('graphql');

const optionType = require('./type');
const deleteType = require('../../helpers/types/delete');

const { resolver } = require('graphql-sequelize');

const inputOptionType = new GraphQLInputObjectType({
  name: 'InputOption',
  fields: {
    id: {
      description: 'ID of option',
      type: GraphQLString
    },
    name: {
      description: 'Name of option',
      type: new GraphQLNonNull(GraphQLString)
    },
    value: {
      description: 'Value of option',
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

module.exports = ({ Option }) => ({
  upsertOptions: {
    type: new GraphQLList(optionType),
    args: {
      options: {
        description: 'Array of options to update',
        type: new GraphQLNonNull(
          new GraphQLList(inputOptionType)
        )
      }
    },
    resolve: async function(
      root,
      { options },
      context,
      info
    ) {
      const { user: { id: userId } } = context;
      if (!userId) return null;

      const newOptions = await Promise.all(
        options.map(option =>
          Option.upsert(
            Object.assign({}, option, {
              UserId: userId
            })
          )
        )
      );

      return resolver(Option)(
        root,
        { options: newOptions },
        context,
        info
      );
    }
  },
  deleteOption: {
    type: deleteType,
    args: {
      id: {
        description: 'ID of option',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async function(root, { id }, context) {
      const { user: { id: userId } } = context;
      if (!id || !userId) return null;

      const option = await Option.findOne({
        where: {
          id,
          UserId: userId
        }
      });

      if (!option)
        return {
          success: false
        };

      await option.set('isDeleted', true).save();
      return { success: true };
    }
  }
});
