const {Router} = require('express')
const {
    index,
    store,
    update,
    destroy,
    updatePatch
} = require("../controllers/user.controller");

const router = Router();

router.get('/', index);

router.post('/', store)

router.put('/:id', update)

router.patch('/', updatePatch)

router.delete('/', destroy)

module.exports = router