require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var largeFormRouter = require('./routes/largeform');

var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerI18N = require('swagger-i18n-extension');

var sqlite3 = require('sqlite3').verbose();

var { listAllForms } = require('./functions/largeformfunctions');

var swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sample Forms API',
      'x-title-i18n': {
        eng: 'Sample Forms API',
        por: 'Exemplo de API de Formulários'
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

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin');
  next();
});

function _startDB() {
  var db = new sqlite3.Database('./db/sample-app.db', (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS large_form (
      name TEXT NOT NULL,
      phone TEXT,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      zip_code TEXT,
      instagram TEXT,
      github TEXT,
      identity_number TEXT,
      tax_id TEXT UNIQUE,
      gender TEXT,
      age TEXT,
      job TEXT,
      company TEXT,
      state TEXT,
      city TEXT,
      address TEXT,
      number TEXT,
      neighborhood TEXT,
      complement TEXT,
      PRIMARY KEY (email)
    );
  `);

  return db;
}

app.use((req, res, next) => {
  var db = _startDB();  
  req.app.set('db', db);
  
  next();
})

var getLanguageFromRouteMiddleware = (req, res, next) => {

  var { lang='por' } = req.params;  
  res.locals = {...res.locals, lang};

  next();
}

var i18nSwaggerMiddleware = (req, res, next) => {

  var swaggerSpec = swaggerJSDoc(swaggerOptions);
  var translatedDoc = swaggerI18N.translate(swaggerSpec, res.locals.lang);
  
  res.locals = {...res.locals, translatedDoc};

  next();
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

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);

var socketIO = require('socket.io');
var io = socketIO(server, {
  pingTimeout: 1000,
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  var db = _startDB();
  listAllForms({
    db,
    onSuccess: result => {
      socket.emit('list', result);
      db.close();
    },
    onFailure: error => {
      console.log(error)
      db.close();
    },
    onEmptyList: () => {
      socket.emit('list', []);
      db.close();
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(function(req, res, next) {
  req.app.set('io', io);
  next();
});

app.use('/large-form', largeFormRouter);

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
  res.send(err.message);
});

module.exports = {app, server};
