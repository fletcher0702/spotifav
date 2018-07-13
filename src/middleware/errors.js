export default (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.status === 404) {
    return res.status(404).send({
      name: err.name,
      ressource: req.url,
      message: err.message,
      errorCode: 'NOT_FOUND',
      status: err.status,
      stack: err.stack,
    });
  }

  if (err.isJoi) {
    return res.status(400).send({
      name: err.name,
      ressource: req.url,
      message: err.message,
      details: err.details,
      errorCode: 'BAD_PARAMETERS',
      status: err.status,
      stack: err.stack,
    });
  }

  return res.status(500).send({
    name: err.name,
    ressource: req.url,
    message: err.message,
    errorCode: 'SERVER_ERROR',
    status: err.status,
    stack: err.stack,
  });
};
