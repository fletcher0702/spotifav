import listsServices from '../../../modules/users/services';

export default function (req, res, next) {
  listsServices
    .findOne(req.params.id)
    .then(response => res.send(response))
    .catch(err => next(err));
}
