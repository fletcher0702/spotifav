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
export default {
  notFound,
  alreadyExist,
};
