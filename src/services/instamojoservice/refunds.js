// API to create new refund request


const Instamojo = require('./instamojopayments')
const invoicedbqueries = require('../../helpers/invoicedbqueries');

const refundrequest = async(res, payment_id, type, body, amount) => {
    try{
        const refund = new Instamojo.RefundRequest();
        refund.payment_id = payment_id;     // mandatory
        refund.type = type;     // mandatory Available : ['RFD', 'TNR', 'QFL', 'QNR', 'EWN', 'TAN', 'PTH']
        refund.body  = body;     // Reason for refund
        if(amount > 0) refund.setRefundAmount(amount);  // Optional, if you want to refund partial amount
        console.log(refund);
        Instamojo.createRefund(refund, async(error, response) => {
            console.log('refundresponse',response);  
            if(response.success) {
                const refundobj = response.refund;
                await invoicedbqueries.updaterefunddetails(refundobj.id, refundobj.payment_id, refundobj.refund_amount, refundobj.status )
                res.status(200).send({success: true, response});
            }
            else {
                res.status(500).send({success: false, response});
            }
        });
    } catch(e){
        throw e;
    }
}

module.exports = {refundrequest};