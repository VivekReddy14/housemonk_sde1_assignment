// Endpoints for payment APIs
// Calling paymentController to do the requred operaions accoring to endpoint

const express = require('express');
const paymentController = require('../controller/paymentController')
const request=express.Router();

request.get("/", async(req,res)=>{
    res.send("payment base route")
})

request.post("/newpaymentrequest", async(req,res)=>{
    await paymentController.newpaymentrequest(req, res);
})

request.post("/imwebhook", async(req,res)=>{
    await paymentController.imwebhook(req, res);
})

request.post("/initiateRefund", async(req,res) => {
    await paymentController.initiateRefund(req, res);
})

module.exports = request;