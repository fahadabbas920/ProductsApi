class ApiErros extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // this.type = "PRODUCTS_ERROR";
  }
}
// class ProductsError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.type = "PRODUCTS_1"
//   }
// }

// new ApiErros()

const throwApiError = (message, statusCode) => {
  return new ApiErros(message, statusCode);
};

module.exports = { throwApiError, ApiErros };
