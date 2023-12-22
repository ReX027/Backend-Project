import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    
      // Instead of using uniqueSuffix and in callback file.fieldname
      // we can also use file.originalname method to save image as user original filename saved
      // But it will overwrite the files if they have same name. Though it will take very less time to upload file on 
      // cloudinary and delete file from here.
      // Code is: cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage
})