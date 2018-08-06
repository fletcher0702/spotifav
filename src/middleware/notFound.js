export default (req, res, next) => {
  const error = new Error(`Not found for ressource: ${req.url} #errorID`);
  error.status = 404;
  next(error);
};
