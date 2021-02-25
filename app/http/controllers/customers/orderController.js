const Order = require("../../../models/order")
const moment = require("moment")

function orderController() {
    return {
        store(req, res) {
            console.log(req.body)
            // Request Validation
            const { phone, address } = req.body
            if(!phone || !address) {
                req.flash("error", "All fields are required")
                return res.redirect("/cart")  
            }
            //Creating a new order
            const order = new Order({
                customerId : req.user._id,
                items : req.session.cart.items,
                phone,
                address
            })
            order.save().then(result => {
                req.flash("success", "Order placed successfully")
                delete req.session.cart
                return res.redirect("/customers/orders")
            }).catch(err => {
                req.flash("error", "Something went wrong")
                return res.redirect("/cart")
            })
        },
       async index(req, res) {
           const orders = await Order.find({customerId : req.user._id})
           res.render("/orders", {orders : orders, moment : moment})
        }
    }
}
module.exports = orderController