var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();

var indexRouter = require('./routes/index'); // routes/index
var recetassaladasRouter = require('./routes/recetassaladas'); //routes/recetassaladas
var recetasdulcesRouter = require('./routes/recetasdulces'); //routes/recetasdulces
var comunicateconnosotrosRouter = require('./routes/comunicateconnosotros'); //routes/comunicateconnosotros
var pizzaRouter = require('./routes/pizza');
var panRouter = require('./routes/pan');
var tallarinesRouter = require('./routes/tallarines');
var berenjenasRouter = require('./routes/berenjenas');
var tortelliniRouter = require('./routes/tortellini');
var lasagnaRouter = require('./routes/lasagna');
var pastelitosRouter = require('./routes/pastelitos');
var flanRouter = require('./routes/flan');
var rosquitasRouter = require('./routes/rosquitas');
var loginRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/novedades');

var app = express();
var session = require('express-session');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'12w45qelqe4qleq54eq5',
  Resave: false,
  saveUninitialized: true
}))
secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error)
  }
}



app.use('/', indexRouter);
app.use('/recetassaladas', recetassaladasRouter);
app.use('/recetasdulces', recetasdulcesRouter);
app.use('/comunicateconnosotros', comunicateconnosotrosRouter); //routes/comunicateconnosotros
app.use('/pizza', pizzaRouter);
app.use('/pan', panRouter);
app.use('/lasagna', lasagnaRouter);
app.use('/tortellini', tortelliniRouter);
app.use('/tallarines', tallarinesRouter);
app.use('/berenjenas', berenjenasRouter);
app.use('/pastelitos', pastelitosRouter);
app.use('/flan', flanRouter);
app.use('/rosquitas', rosquitasRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
