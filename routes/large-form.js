var express = require('express');
var router = express.Router();

/**
 * @swagger
 *
 * /large-form:
 *   post:
 *     tags:
 *        - Forms 
 *     description: Creates a large
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: API is Ok
 */
router.get('/large-form', function(req, res, next) {
  res.json({ helloWorld: 'Hello World!' });
  res.end();
});

module.exports = router;
