// CRUD applications on our invoice db
// Calling invoieController to do the requred operaions accoring to endpoint

const express = require('express');
const invoiceController = require('../controller/invoiceController')
const request=express.Router();

request.get("/", async(req,res)=>{
    res.send("invoice base route")
})

request.get("/getallinvoices", async(req,res)=>{
    await invoiceController.getallinvoices(req,res);
})

request.get("/getinvoicedetails/:invoiceid", async(req,res)=>{
    await invoiceController.getinvoicedetails(req,res);
})

request.post("/createinvoice", async(req,res)=>{
    await invoiceController.createinvoice(req,res);
})

request.post("/updateinvoice", async(req,res)=>{
    await invoiceController.updateinvoice(req,res);
})

module.exports = request;