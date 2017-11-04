const fields = [
  'user',
  'wallet',
  'coin',
  'transaction',
  'option'
].reduce((all, model) => {
  return Object.assign({}, all, require(`./${model}/fields`));
  }, {});

module.exports = () => fields;