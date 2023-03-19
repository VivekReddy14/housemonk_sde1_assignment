// Initialising Instamojo client connection

let Instamojo = require('Instamojo-nodejs');

const { Instamojokeys } = require('../../config/secrets')

Instamojo.setKeys(Instamojokeys.API_KEY, Instamojokeys.AUTH_KEY);

// Mentionting test environment
Instamojo.isSandboxMode(true);

module.exports = Instamojo

// There are additional APIs like 
// 1. get all payments
// 2. get refund details
// 3. initialise refund Etc 
// can be used similar to newpaymentrequest API
// As the time is limited I only integrated paymentrequest API.