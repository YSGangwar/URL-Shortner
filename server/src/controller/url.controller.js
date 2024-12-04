const { urlService} = require('../services');
const shortner = async(req , res) =>{
    const { url } = req.body;
    const hashedURL = await urlService.urlShortner(url);
    return res.json({code:"200", message:"success" , hashedURL:hashedURL})
}

const finder = async(req , res )=>{
    const { hashedData } = req.params;
    const completeUrl = await urlService.urlFinder(hashedData);
    return res.redirect(completeUrl);

}
module.exports  = {
    shortner,
    finder,
}