// All payment APIs can be written here and reused accroess the repo

const invoicedbqueries = require('./invoicedbqueries')
const { refundrequest } = require('../services/instamojoservice/refunds');

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
        const payment_requestid = data.payment_request_id;
        const updatedata = {};
        if(data.status === 'Credit') updatedata.status = 2;
        if(data.status === 'Failed') updatedata.status = 3;
        console.log('webhokdata',data)
        if(data?.fees !== undefined) updatedata.fees = data.fees;
        else updatedata.fees = 0;
        console.log('update',updatedata)
        const resp = await invoicedbqueries.updatewithpaymentrequestid(data.payment_id, payment_requestid, updatedata, updatedata.fees);
        return resp;
    } catch(e){
        console.log(e);
        throw e;
    }
}

paymenthelper.initiateRefund = async(data, res) => {
    try{
        const refundData = {};
        refundData.payment_id = data.payment_id;
        refundData.type = data.type;
        refundData.body = data.reason;
        refundData.amount = data.amount;
        console.log(refundData);
        const response = await refundrequest( res, refundData.payment_id, refundData.type, refundData.body, refundData.amount )
    } catch(e){
        throw e;
    }
}

module.exports = paymenthelper;
