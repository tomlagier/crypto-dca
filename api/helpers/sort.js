// Custom sort override for exact matches first
module.exports = (results, args) => {
  return results.sort((a, b) => {
    if (a.name === args.query) {
      return 1;
    }
    else if (b.name === args.query) {
      return -1;
    }

    return 0;
  });
}