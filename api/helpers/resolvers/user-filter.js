module.exports = context => {
  if (!context.user) return null;
  return {
    UserId: context.user.id
  };
};
