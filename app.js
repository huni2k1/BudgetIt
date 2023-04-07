var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./controllers/users');
var transactionRouter = require('./controllers/transaction');
var app = express();
var connectDB  = require('./utils/connectDB')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB.connectDB()
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({error:err.message})
});
const PORT = 3002
const server=app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
module.exports = app;
