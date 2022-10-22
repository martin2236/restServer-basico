const {Router} = require('express');
const { check } = require('express-validator');

const { userGet, userPut, userPost, userDelete } = require('../controllers/users');

const {validarCampos, validarToken, validarRol, tieneRol } = require('../middlewares')

const {esRolValido, esEmailUnico, esUnUsuarioRegistrado} = require('../helpers/dbValidators')

const router = Router();

router.get('/', userGet);

router.put('/:id',[
  check('id', 'el id enviado no es válido').isMongoId(),
  check('id').custom(esUnUsuarioRegistrado),
  check('rol').custom(esRolValido),
  validarCampos
], userPut);

router.post('/',[
  check('nombre','el nombre es obligatorio').not().isEmpty(),
  check('password','el password debe tener mas de 6 caracteres').isLength({min:6}),
  check('correo','el correo no es valido').isEmail(),
  check('correo').custom(esEmailUnico),
  check('rol').custom(esRolValido),
  validarCampos
],userPost);

router.delete('/:id',[
  validarToken,
  tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
  check('id', 'el id enviado no es válido').isMongoId(),
  check('id').custom(esUnUsuarioRegistrado),
  validarCampos
],userDelete);

module.exports = router