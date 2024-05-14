import multer from 'multer';

//const upload = multer({dest:'src/public/img'}); //Forma basica de implementar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const upload = multer({storage:storage})