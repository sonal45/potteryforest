const Menu = require("../../models/menu")

function homeController() {
    return {
        index(req, res){
            Menu.find().then(function (cakes) {
                console.log(cakes)
                return res.render("home", {cakes : cakes})  
            })
        }
    }
}

module.exports = homeController