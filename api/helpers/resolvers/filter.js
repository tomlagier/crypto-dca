const { resolver } = require('graphql-sequelize');
const { Op: {and} } = require('sequelize');


const extendBefore = (before, filters) => {
  if (!before) {
    return findOptions => ({
      ...findOptions,
      where: { [and]: filters }
    })
  }

  return (findOptions, args) => {
    const nextBefore = before(findOptions, args);

    const { where } = nextBefore;

    if (!where) {
      return {
        ...nextBefore,
        where: { [and]: filters }
      }
    }

    return {
      ...nextBefore,
      where: {
        [and]: [
          ...filters,
          where
        ]
      }
    }
  }
}

const getValidFilters = (filters, context) => {
  const validFilters = [];
  for (const filter of filters) {
    const validFilter = filter(context);
    if (!validFilter) {
      return null;
    }
    validFilters.push(validFilter);
  }

  return validFilters;
}

const resolverWithFilters = filters =>
  (model, opts = {}) =>
    (root, args, context = {}, info) => {
      const validFilters = getValidFilters(filters, context);
      const { before } = opts;

      if (!validFilters) return null;

      const optsWithFilters = {
        ...opts,
        before: extendBefore(before, validFilters)
      }

      return resolver(model, optsWithFilters)(root, args, context, info);
    }

const userFilter = require('./user-filter');
const deletedFilter = require('./deleted-filter');
module.exports = {
  resolverWithFilters,
  withUser: resolverWithFilters([userFilter]),
  withDeleted: resolverWithFilters([deletedFilter]),
  withUserAndDeleted: resolverWithFilters([userFilter, deletedFilter])
};
