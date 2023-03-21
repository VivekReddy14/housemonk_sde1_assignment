// All queries of invoicedb can be written here and be reused accross the repo

const invoicedb = require('../models/invoiceModel')
const invoicedbqueries = {}

invoicedbqueries.getallinvoices = async() => {
    try{
        return await invoicedb.find({})
    } catch(e){
        console.log("DB find query error : ", e);
        throw e;
    }
}

invoicedbqueries.createinvoice = async(data) => {
    try{
        let newinvoice = new invoicedb({...data, status: 1, isactive: true, ispaymentlinkgenerated : false,});
        await newinvoice.save();
        return {message: "Created succefully", success: true} 
    } catch(e){
        console.log("DB insert query error : ", e);
        throw e;
    }
}

invoicedbqueries.getinvoicedetails = async(id) => {
    try{
        return await invoicedb.findById(id);
    }  catch(e){
        console.log("DB find query error : ", e);
        throw e;
    }
}

invoicedbqueries.updateinvoice = async(_id, data) => {
    try{
        const resp = await invoicedb.findByIdAndUpdate({_id :_id}, data);
        return resp;
    } catch(e){
        console.log("DB update query error : ", e);
        throw e;
    }
}

invoicedbqueries.updatewithpaymentrequestid = async(payment_id = '', payment_requestid, data, conveniencefees) => {
    try{
        const updatedata = { ...data, "paymentmeta.payment_id" : payment_id , "paymentmeta.conveniencefees" : conveniencefees}
        const resp = await invoicedb.findOneAndUpdate({"paymentmeta.payment_requestid": payment_requestid}, updatedata);
        return resp;
    } catch(e){
        console.log("DB update query error : ", e);
        throw e;
    }
}

invoicedbqueries.updaterefunddetails = async(refund_id, payment_id, refundAmount, refundStatus) => {
    try{
        const refundMeta = {
            isRefundRequired : true,
            isRefundInitiated : true,
            refund_id , 
            refundStatus,
            refundAmount
        }
        return await invoicedb.findOneAndUpdate({"paymentmeta.payment_id": payment_id}, {refundMeta, status: 4});
    } catch(e){
        console.log("DB refund update query error : ", e);
        throw e;
    }
}

module.exports = invoicedbqueries;