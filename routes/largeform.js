var { CreateLargeForm } = require('../entities/largeform');

var express = require('express');
var router = express.Router();

/**
 * @swagger
 *
 * /large-form:
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
 *       500:
 *         description: Not treated error.
 *         x-description-i18n: 
 *            eng: Not treated error.
 *            por: Erro não tratado.
 */
router.post('/', function(req, res, next) {
  var db = req.app.get('db');
  console.log('On post large-form', req.body);
  var form = CreateLargeForm(req.body);
  var [query, values] = form.createCommand();

  db.run(query, values, function(err) {
    if (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
    
    console.log(`A row has been inserted with rowid ${this.lastID}`);

    res.status(200).send({message: 'Saved data!'});
  });

  db.close();

});

/**
 * @swagger
 *
 * /large-form:
 *   put:
 *     tags:
*        - Forms
 *     description: Rewrite a form like data from json request body.
 *     x-description-i18n:
 *        eng: Rewrite a form like data from json request body.
 *        por: Sobrescreve os dados, em formato de formulário, a partir do corpo da requisição, em json.
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
 *       500:
 *         description: Not treated error.
 *         x-description-i18n: 
 *            eng: Not treated error.
 *            por: Erro não tratado.
 */
router.put('/', function(req, res, next) {
  if(!req.body.email) return res.status(400).send({message: 'You should inform an email.'});

  var db = req.app.get('db');

  var form = CreateLargeForm(req.body);
  var [query, values] = form.updateCommand();

  db.run(query, values, function(err) {
    if (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
    
    if(this.changes == 0) return res.status(204).send({message: `Entry not found for email ${req.body.email}`});

    res.status(200).send({message: 'Rewrited data!'});
  });

  db.close();

});

/**
 * @swagger
 *
 * /large-form/{email}:
 *   get:
 *     tags:
*        - Forms
 *     description: Get saved data based on email value.
 *     x-description-i18n:
 *        eng: Get saved data based on email value.
 *        por: Recupera os dados salvos a partir do email.
 *     parameters:
 *        - in: path
 *          name: email
 *          schema:
 *            type: string
 *          required: true
 *          description: Email used to save the form.
 *          x-description-i18n:
 *            eng: Email used to save the form.
 *            por: Email informado durante o cadastro do formulário.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Form that matches email condition.
 *         x-description-i18n: 
 *            eng: Form that matches email condition.
 *            por: Formulário que corresponde ao email informado.
 *       500:
 *         description: Not treated error.
 *         x-description-i18n: 
 *            eng: Not treated error.
 *            por: Erro não tratado.
 *       204:
 *         description: Entry not found.
 *         x-description-i18n: 
 *            eng: Entry not found.
 *            por: Registro não encontrado.
 */
router.get('/:email', function(req, res, next) {
  var db = req.app.get('db');

  var { email } = req.params; 

  var form = CreateLargeForm({email});
  var [query, values] = form.retireveCommand();

  db.get(query, values, function(err, row) {
    if (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
    
    if(row) {
      var result = CreateLargeForm(row);
      res.status(200).send(result);
    }
    else {
      res.status(204).send({message: `Entry not found for email ${email}`});
    }
    
  });

  db.close();
});

/**
 * @swagger
 *
 * /large-form/{email}:
 *   delete:
 *     tags:
 *        - Forms
 *     description: Delete saved data based on email value.
 *     x-description-i18n:
 *        eng: Delete saved data based on email value.
 *        por: Deleta os dados salvos a partir do email.
 *     parameters:
 *        - in: path
 *          name: email
 *          schema:
 *            type: string
 *          required: true
 *          description: Email used to save the form.
 *          x-description-i18n:
 *            eng: Email used to save the form.
 *            por: Email informado durante o cadastro do formulário.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Deletion successfully.
 *         x-description-i18n: 
 *            eng: Deletion successfully.
 *            por: Deleção realizada com sucesso.
 *       500:
 *         description: Not treated error.
 *         x-description-i18n: 
 *            eng: Not treated error.
 *            por: Erro não tratado.
 */
router.delete('/:email', function(req, res, next) {
  var db = req.app.get('db');

  var { email } = req.params; 

  var form = CreateLargeForm({email});
  var [query, values] = form.deleteCommand();

  db.run(query, values, function(err) {
    if (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
    
    res.status(200).send({message: 'Deleted Successfully!'});
    
  });

  db.close();
});

module.exports = router;
