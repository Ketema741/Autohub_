
const jwt = require('jsonwebtoken')
const { roles } = require('../configurations/roles')

const grantAccess = (action, resource)=>{
    return async (req, res, next )=>{
        
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_JWT)
            
        try {
            const permissions = roles.can(decoded.user.role)[action](resource)
            if(!permissions.granted){
                return res.status(403).json({
                    ErrorMessage:"Sorry! You don't have that permission"
                })
            }
            next()
        } catch (error) {
            res.status(400).json({error: error})
        }
    }
}
 
function checkRole(role) {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next();
      } else {
        res.status(403).send('Access forbidden');
      }
    };
  }
  

module.exports = {
    grantAccess,
}