var jwt = require('jsonwebtoken');

var SECRET = process.env.SECRETKEY;//var avec la base mongo 'simplon_reunion_4p_dw-AB_IH_JFG'
    SECRET = 'simplon_reunion_4p_dw-AB_IH_JFG'; // /!\ COMMENTER LORS DE LA MISE EN PROD, UNIQUEMENT POUR LES TESTS'
//export du module de la fonction ensure
module.exports = {
    ensureToken : function (req, res, next) {
        console.log("headers = ", req.headers);
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.status(403).send("accès refusé");
        }
    },
    verifAdmin : function (req, res, next) {  
        jwt.verify(req.token, SECRET, function(err, data) {
            if (err) {
                res.status(403).send("nope");
            } else {
                if (data.role===2) {    
                    console.log("droit ok");             
                    req.body.role = data.role;       
                    next(); 
                }else{
                    res.status(403).send("Vous n'avez pas les droit necessaire pour allez ici");
                }
            }
          });
    }
}