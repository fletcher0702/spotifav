function notFound() {
  const error = new Error('Not Found');
  error.status = 404;
  return error;
}

function alreadyExist() {
  const error = new Error('Already Exist');
  error.status = 409;
  return error;
}

function forbidden() {
  const error = new Error('Access forbidden');
  error.status = 403;
  return error;
}

function unauthorized() {
  const error = new Error('Unauthorized');
  error.status = 401;
  return error;
}

export default {
  notFound,
  alreadyExist,
  forbidden,
  unauthorized,
};
