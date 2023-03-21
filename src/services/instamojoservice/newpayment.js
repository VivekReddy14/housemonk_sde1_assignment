// API to create new payment request

const Instamojo = require('./instamojopayments')
const invoicedbqueries = require('../../helpers/invoicedbqueries');

const { webhookbaseurl, redirecturl } = require('../../config/urlconfigs');

const newpayment = async(paymentdata, invoiceid, res) => {
    let data = new Instamojo.PaymentData();
    data.purpose = paymentdata.purpose;  // REQUIRED
    data.amount = paymentdata.amount;    // REQUIRED
    // data.email = '<>';
    // data.phone = <>;
    // data.send_sms  = 'False';
    // data.send_email   = 'False';
    // These additional fields can be used as per our requrement
    data.allow_repeated_payments = 'False';
    data.webhook = webhookbaseurl + '/payment/imwebhook';
    data.redirect_url  = redirecturl;
    
    Instamojo.createPayment(data, async(error, response)=> {
        if (error) {
            console.log(error)
            throw error
        } 
        else{
            response = JSON.parse(response);
            if(response.success != true){
                res.status(500).send(response);
            } 
            else{
                // Updating paymentrequestid in our database and marking the payment link generated flag to true 
                const resp = await invoicedbqueries.updateinvoice(invoiceid, {
                    ispaymentlinkgenerated : true,
                    paymentmeta : {
                        payment_requestid : response.payment_request.id,
                        paymentlink : response.payment_request.longurl
                    } 
                })
                console.log(response);
                res.send(response);
            }
        }
    });
}

module.exports = newpayment;