const router = require('express').Router();
const thoughtsRoutes = require('./api/thoughtsRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', userRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
