const { resolver } = require('graphql-sequelize');
const { Op: {and} } = require('sequelize');


const extendBefore = (before, id) => {
  const belongsToUser = {
    UserId: id
  };

  if (!before) {
    return findOptions => ({
      where: belongsToUser,
      ...findOptions
    })
  }

  return (findOptions, args) => {
    const nextBefore = before(findOptions, args);

    const { where } = nextBefore;
    if (!where) {
      return {
        where: belongsToUser,
        ...nextBefore
      }
    }

    return {
      where: {
        [and]: [
          { UserId: id },
          where
        ]
      },
      ...nextBefore
    }
  }
}

const resolverWithUser = (model, opts = {}) => (root, args, context = {}, info) => {
  const { before } = opts;
  const { user } = context;

  if (!user) {
    return null;
  }

  const optsWithUser = {
    before: extendBefore(before, user.id),
    ...opts
  }

  return resolver(model, optsWithUser)(root, args, context, info);
}

module.exports = resolverWithUser;