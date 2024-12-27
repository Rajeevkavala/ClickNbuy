import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;

//Working code But not getting response from cloudinary

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const router = express.Router();

// // Set up memory storage for multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Image filter to allow only specific file types
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Images only'), false);
//   }
// };

// const uploadSingleImage = upload.single('image');

// // Define the upload route
// router.post('/', (req, res) => {
//   console.log("Received upload request");

//   // First, handle the file upload with multer
//   uploadSingleImage(req, res, async (err) => {
//     console.log("Multer middleware hit"); // Ensure multer is processing the request

//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(400).send({ message: err.message });
//     }

//     console.log("File uploaded by multer:", req.file);
//     console.log("File buffer size:", req.file.buffer.length);

//     if (req.file) {
//       try {
//         // Cloudinary upload using upload_stream to handle buffer
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: 'auto', // Automatically detect the file type
//             folder: 'ClickNBuy',    // Specify folder in Cloudinary
//           },
//           (error, result) => {
//             if (error) {
//               console.error('Cloudinary upload error:', error);
//               return res.status(500).send({
//                 message: 'Error uploading file to Cloudinary',
//                 error: error.message,
//               });
//             }

//             console.log('Cloudinary upload result:', result);  // Log Cloudinary response

//             // Sending the response after successful upload
//             console.log("Sending response...");
//             return res.status(200).send({
//               message: 'Image uploaded successfully',
//               imageUrl: result.secure_url,  // Cloudinary secure URL
//             });
//           }
//         );

//         // Pipe the image buffer to Cloudinary using the upload stream
//         console.log("Piping buffer to Cloudinary...");
//         uploadStream.end(req.file.buffer);
//       } catch (uploadError) {
//         console.error('Error during Cloudinary upload:', uploadError);
//         return res.status(500).send({
//           message: 'Error during Cloudinary upload',
//           error: uploadError.message,
//         });
//       }
//     } else {
//       console.log('No file found in request');
//       return res.status(400).send({ message: 'No image file provided' });
//     }
//   });
// });

// export default router;


//Google Cloud Storage

// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { Storage } from '@google-cloud/storage';  // Import the Google Cloud Storage SDK
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Configure Google Cloud Storage
// const storage = new Storage({
//   projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,  // Set the Google Cloud project ID
//   keyFilename: './backend/config/charged-city-445810-r6-97b720f58e17.json', // Path to the Google Cloud service account key file
// });

// const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET);  // Set the bucket name

// const router = express.Router();

// // Set up memory storage for multer
// const multerStorage = multer.memoryStorage();
// const upload = multer({ 
//   storage: multerStorage, 
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpe?g|png|webp/;
//     const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//     const extname = path.extname(file.originalname).toLowerCase();
//     const mimetype = file.mimetype;

//     if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Images only'), false);
//     }
//   } 
// });

// // Middleware for single image upload
// const uploadSingleImage = upload.single('image');

// // Define the upload route
// router.post('/', (req, res) => {
//   console.log("Received upload request");

//   // Handle the file upload with multer
//   uploadSingleImage(req, res, async (err) => {
//     console.log("Multer middleware hit");

//     if (err) {
//       console.error('Multer error:', err);
//       return res.status(400).send({ message: err.message });
//     }

//     if (req.file) {
//       try {
//         console.log("File uploaded by multer:", req.file.originalname);

//         // Use the original filename for the uploaded file
//         const blob = bucket.file(req.file.originalname);
//         const blobStream = blob.createWriteStream({
//           resumable: false,  // Set to false if you are not uploading large files in chunks
//           contentType: req.file.mimetype,
//         });

//         blobStream.on('error', (error) => {
//           console.error('Google Cloud Storage upload error:', error);
//           return res.status(500).send({
//             message: 'Error uploading file to Google Cloud Storage',
//             error: error.message,
//           });
//         });

//         blobStream.on('finish', () => {
//           // Get the public URL of the uploaded file
//           const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
//           console.log('File uploaded to Google Cloud Storage:', publicUrl);

//           // Send the response after successful upload
//           return res.status(200).send({
//             message: 'Image uploaded successfully',
//             imageUrl: publicUrl,  // Public URL of the uploaded image
//           });
//         });

//         // Pipe the image buffer to Google Cloud Storage
//         blobStream.end(req.file.buffer);
//       } catch (uploadError) {
//         console.error('Error during Google Cloud Storage upload:', uploadError);
//         return res.status(500).send({
//           message: 'Error during Google Cloud Storage upload',
//           error: uploadError.message,
//         });
//       }
//     } else {
//       console.log('No file found in request');
//       return res.status(400).send({ message: 'No image file provided' });
//     }
//   });
// });

// export default router;
