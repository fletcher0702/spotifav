import listsServices from '../../../modules/users/services';

export default function (req, res, next) {
  listsServices
    .updateOne(req.params.id, req.body)
    .then(response => res.send(response))
    .catch(err => next(err));
}
