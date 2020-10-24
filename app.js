const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const largeFormRouter = require('./routes/large-form');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerI18N = require('swagger-i18n-extension');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      'x-title-i18n': {
        eng: 'Title on english',
        por: 'Titulo em Português'
      },
      version: '1.0.0',
    },
  },
  apis: ['./routes/**/*.js'],
};

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('etag', false);

app.use('/large-form', largeFormRouter);

const getLanguageFromRouteMiddleware = (req, res, next) => {

  const { lang='por' } = req.params;  
  res.locals = {...res.locals, lang};

  next();
}

const i18nSwaggerMiddleware = (req, res, next) => {

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  const translatedDoc = swaggerI18N.translate(swaggerSpec, res.locals.lang);
  
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
