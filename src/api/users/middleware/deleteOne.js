import listsServices from '../../../modules/users/services';

export default function (req, res, next) {
  return listsServices
    .deleteOne(req.params.id)
    .then(response => res.send(response))
    .catch(err => next(err));
}
