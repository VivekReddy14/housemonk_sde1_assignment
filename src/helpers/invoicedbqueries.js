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
        return "Created succefully"
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

invoicedbqueries.updatewithpaymentid = async(payment_id, data) => {
    try{
        const resp = await invoicedb.findOneAndUpdate({"paymentmeta.payment_id": payment_id}, data);
        console.log( await invoicedb.find({"paymentmeta.payment_id": payment_id}))
        return resp;
    } catch(e){
        console.log("DB update query error : ", e);
        throw e;
    }
}

module.exports = invoicedbqueries;