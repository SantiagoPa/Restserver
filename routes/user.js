const {Router} = require('express');
const { usersGet,
        usersPost,
        usersPut,
        usersPatch,
        userDelete } = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.post('/', usersPost); 

router.put('/:id', usersPut);

router.patch('/', usersPatch);

router.delete('/', userDelete);

module.exports = router;
