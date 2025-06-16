export const authenticate = (req, res, next) => {
  req.user = { id: 4 };
  next();
};
