function notFound() {
  const error = new Error('Not Found');
  error.status = 404;
  return error;
}
export default {
  notFound,
};
