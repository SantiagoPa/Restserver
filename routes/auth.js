const {Router} = require('express');
const {check}  = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-campos');

const router = Router();

router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseñas es obligatoria').not().isEmpty(),
    validateFields
], login);

module.exports = router;