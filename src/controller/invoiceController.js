// Does the required operations and returns response

const invoicedbqueries = require('../helpers/invoicedbqueries')
const invoiceController = {}

invoiceController.getallinvoices = async(req, res) => {
    try{
        const response = await invoicedbqueries.getallinvoices();
        res.send(response);
    }catch(e){
        res.status(500).send(e);
    }
}

invoiceController.getinvoicedetails = async(req, res) => {
    try{
        const response = await invoicedbqueries.getinvoicedetails(req.params.invoiceid);
        res.send(response);
    }catch(e){
        res.status(500).send(e);
    }
}

invoiceController.createinvoice = async(req, res)=>{
    try{
        const response = await invoicedbqueries.createinvoice(req.body);
        res.send(response);
    }catch(e){
        res.status(500).send(e);
    }
}

invoiceController.updateinvoice = async(req, res) => {
    try{
        const response = await invoicedbqueries.updateinvoice(req.body.invoiceid, req.body.data);
        res.send(response);
    }catch(e){
        res.status(500).send(e);
    }
}

module.exports = invoiceController