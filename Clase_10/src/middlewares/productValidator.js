export const productValidator = (req, res, next) => {
    if(
        req.body.title === undefined ||
        req.body.description === undefined ||
        req.body.category === undefined ||
        req.body.price === undefined ||
        //req.body.thumbnail === undefined ||
        req.body.code === undefined ||
        req.body.stock === undefined
        //req.body.status === undefined
    ) res.status(404).json({msg: 'Invalid body'});
    else next();
}