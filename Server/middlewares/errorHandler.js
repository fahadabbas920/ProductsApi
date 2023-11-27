// function errorHandler(err, req, res, next) {
//   return res.status().json({ success: false, message: err.message });

//   // if (res.headersSent) {
//   //   return next(err)
//   // }
//   // res.status(500)
//   // res.render('error', { error: err })
// }

class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
