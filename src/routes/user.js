const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.get('/', userGet);
router.put('/:id', userPut);
router.post('/',[
  check('nombre','el nombre es obligatorio').not().isEmpty(),
  check('password','el password debe tener mas de 6 caracteres').isLength({min:6}),
  check('correo','el correo no es valido').isEmail(),
  validarCampos
],userPost);
router.delete( '/',userDelete);

module.exports = router