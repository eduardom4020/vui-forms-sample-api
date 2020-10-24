var { LargeForm } = '../entities/largeform';

var express = require('express');
var router = express.Router();

/**
 * @swagger
 *
 * /generic-form:
 *   post:
 *     tags:
*        - Forms
 *     description: Saves a form like data from json request body.
 *     x-description-i18n:
 *        eng: Saves a form like data from json request body.
 *        por: Salva os dados, em formato de formulário, a partir do corpo da requisição, em json.
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LargeForm'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Form saved successfully.
 *         x-description-i18n: 
 *            eng: Form saved successfully.
 *            por: Formulário salvo com sucesso.
 */
router.post('/generic-form', function(req, res, next) {
  res.json({ helloWorld: 'Hello World!' });
  res.end();
});

module.exports = router;
