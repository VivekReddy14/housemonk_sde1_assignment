// Initialising invoicetable schema using mongoose

const mongoose = require('mongoose');

// Status for Payments

// Payment pending = 1
// Paid = 2
// Expired = 3
// Refund initiated = 4
// Refund completed = 5

let schema = new mongoose.Schema({
    item : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    purpose: String,
    status : Number,
    isactive : Boolean,
    ispaymentlinkgenerated : Boolean,
    paymentmeta : {
        payment_requestid : String,
        payment_id : String,
        paymentlink : String,
        conveniencefees : Number
    },
    refundMeta : {
        isRefundRequired : Boolean,
        isRefundInitiated : Boolean,
        refund_id : String, 
        refundStatus : String,
        refundAmount : Number
    }
})

const invoicedb = mongoose.model('invoicetable', schema);

module.exports = invoicedb;
