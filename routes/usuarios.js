
const {Router } = require('express');

const { check } = require('express-validator');

const { esRolvalido, emailExiste,existeUsuarioporID } = require('../helpers/db-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet );

router.put('/:id', [
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom( existeUsuarioporID ),
    check('rol').custom( esRolvalido ),
    validarCampos

],usuariosPut);





router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe de ser mas de 6 letras').isLength({ min: 6 }),
    //check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolvalido ),
    validarCampos
], usuariosPost);

router.delete('/:id', usuariosDelete);

router.patch('/',[
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom( existeUsuarioporID ),
    validarCampos
], usuariosPatch);



module.exports = router;