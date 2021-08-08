const express = require('express');
const router = express.Router();

const {getPeople,createPerson,updatePerson,deletePerson,createPostman} = require('../controllers/people')

// router.get('/',getPeople)
// router.post('/',createPerson)
// router.post('/postman',createPostman)
// router.put('/:id',updatePerson)
// router.delete('/:id',deletePerson)

router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router