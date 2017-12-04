module.exports = {
  fileMapTokens({ entity: { options: { path } } }) {
    return {
      __path__: () => path || './',
      __smart__: () => 'containers',
      __dumb__: () => 'components',
      __service__: () => 'services'
    }
  }
};