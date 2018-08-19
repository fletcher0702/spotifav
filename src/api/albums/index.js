import { Router } from 'express';
import passport from 'passport';
import passportStrategy from '../../utils/passport.utils';
import cfg from '../users/middleware/config';
import isAdmin from '../users/middleware/isAdmin';
import find from './middleware/find';
import createOneFavorite from './middleware/createOneFavorite';
import findOneFavorite from './middleware/findOneFavorite';
import findFavorites from './middleware/findFavorites';
import findAllFavorites from './middleware/findAllFavorites';
import deleteOneFavorite from './middleware/deleteOneFavorite';


const router = Router();

router.use(passport.initialize());

passport.use(passportStrategy);
// Albums
router.get('/albums', find);

// Favorites
router.get('/users/:userId/favorites', passport.authenticate('jwt', cfg.jwtSession), findFavorites);
router.post('/users/:userId/favorites', passport.authenticate('jwt', cfg.jwtSession), createOneFavorite);
//
// // A Favorite
router.get('/users/:userId/favorites/:favoriteId', passport.authenticate('jwt', cfg.jwtSession), findOneFavorite);
router.delete('/users/:userId/favorites/:favoriteId', passport.authenticate('jwt', cfg.jwtSession), deleteOneFavorite);

// Admin section

router.get('/admin/favorites', passport.authenticate('jwt', cfg.jwtSession), isAdmin, findAllFavorites);
router.delete('/admin/favorites/:favoriteId', passport.authenticate('jwt', cfg.jwtSession), isAdmin, deleteOneFavorite);

export default router;
