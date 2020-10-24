var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var largeFormRouter = require('./routes/forms');

var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerI18N = require('swagger-i18n-extension');

var swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Title on english',
      'x-title-i18n': {
        eng: 'Title on english',
        por: 'Titulo em Português'
      },
      version: '1.0.0',
    },
  },
  apis: ['./routes/**/*.js', './entities/**/*.js'],
};

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('etag', false);

app.use('/large-form', largeFormRouter);

var getLanguageFromRouteMiddleware = (req, res, next) => {

  var { lang='por' } = req.params;  
  res.locals = {...res.locals, lang};

  next();
}

var i18nSwaggerMiddleware = (req, res, next) => {

  var swaggerSpec = swaggerJSDoc(swaggerOptions);
  var translatedDoc = swaggerI18N.translate(swaggerSpec, res.locals.lang);
  
  res.locals = {...res.locals, translatedDoc};

  next()
}

app.use('/api-docs/:lang/swagger.json',
  getLanguageFromRouteMiddleware,
  i18nSwaggerMiddleware,
  (req, res) => res.json(res.locals.translatedDoc)
);

app.use('/api-docs/:lang', swaggerUi.serve);
app.get(
  '/api-docs/:lang', 
  getLanguageFromRouteMiddleware,
  i18nSwaggerMiddleware,
  (req, res, next) => swaggerUi.setup(res.locals.translatedDoc)(req, res, next)
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
