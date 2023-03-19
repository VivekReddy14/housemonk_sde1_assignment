// Does the required operations and returns response

const paymenthelper = require('../helpers/paymenthelper')

const paymentController = {}

paymentController.newpaymentrequest = async(req,res) => {
    try{
        const response = await paymenthelper.newpaymentrequest(req.body.paymentdata, req.body.invoiceid, res);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

// Webhook to change status of payment
paymentController.imwebhook = async(req,res) => {
    try{
        console.log(req.body);
        const response = await paymenthelper.imwebhook(req.body);
        res.send({...response, success:true});
    } catch(e){
        res.status(500).send({...e, success: false});
    }
}

module.exports = paymentController;

// try{

// }catch(e){
    
// }