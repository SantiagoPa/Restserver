const {Router} = require('express');
const {check}  = require('express-validator');

const { validateFields } = require('../middlewares/validate-campos');
const { isRoleValid, isEmailValid, isUserValidById } = require('../helpers/db-validators');

const { usersGet,
        usersPost,
        usersPut,
        usersPatch,
        userDelete } = require('../controllers/user');






const router = Router();

router.get('/', usersGet);

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe ser de mas de 6 letras').isLength({min:6}),
    check('email').custom( isEmailValid ),
   //check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
   check('rol').custom( isRoleValid ), 
   validateFields
],usersPost); 

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( isUserValidById ),
    check('rol').custom( isRoleValid ), 
    validateFields
], usersPut);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( isUserValidById ),
    validateFields
], userDelete);

router.patch('/', usersPatch);



module.exports = router;
