// All payment APIs can be written here and reused accroess the repo

const invoicedbqueries = require('./invoicedbqueries')

const paymenthelper = {};

paymenthelper.newpaymentrequest = async(data, invoiceid, res) => {
    try{
        const resp = await require('../services/instamojoservice/newpayment')(data, invoiceid, res);
        return resp;
    } catch(e){
        console.log(e);
        throw e;
    }
}

paymenthelper.imwebhook = async(data) => {
    try{
        const payment_id = data.payment_request_id;
        const updatedata = {};
        if(data.status === 'Credit') updatedata.status = 2;
        if(data.status === 'Failed') updatedata.status = 3;
        const resp = await invoicedbqueries.updatewithpaymentid(payment_id, updatedata);
        return resp;
    } catch(e){

    }
}

module.exports = paymenthelper;
