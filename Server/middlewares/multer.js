const multer = require("multer");


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "assets");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // const multer = require("multer");

// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, res, file, callback) {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return callback(null, true);
//     } else {
//       callback("Images only");
//     }
//     // var ext = path.extname(file.originalname);

//     // if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
//     //   return callback(new Error("Valid Image types are png, jpg, gif, jpeg"));
//     // }
//   },
//   // onError: function (err, next) {
//   //   console.log("error", err);
//   //   next(err);
//   //   // return res.status(409).json({
//   //   //   success: false,
//   //   //   msg: "Valid Image types are png, jpg, gif, jpeg",
//   //   // });
//   // },
//   // // limits: {
//   // //   fileSize: 1024 * 1024,
//   // // },
// });

function uploadFile(req, res, next) {
  //   const upload = multer().single("yourFileNameHere");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);

      if (mimetype && extname) {
        return callback(null, true);
      } else {
        callback("Valid Image types are png, jpg, gif, jpeg");
      }
    },
  });

  //   upload(req, res, function (err) {
  //     if (err instanceof multer.MulterError) {
  //       // A Multer error occurred when uploading.
  //       return res.status(400).json({ err: err });
  //     } else if (err) {
  //       return res.status(400).json({ err: err });
  //       // An unknown error occurred when uploading.
  //     }
  //     // Everything went fine.
  //     next();
  //   });
}

module.exports = uploadFile;
