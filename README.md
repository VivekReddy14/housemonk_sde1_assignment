# housemonk_sde1_assignment

This service contains two base API routes 

1. invocie route:
  To access invoice db what can be used by web application to view and manipulate invoices data.
  
2. payment route:
  To create and read payment urls for invoice bills and parse webhooks from vendor (Instamojo)
  
The integration of Instamojo payment gate way is in Instamojo service.

Note: I only used newpayment API of Instamojo as the time is limited, in the same way we can integrate othr APIS such as
Refund APIs, OrderAPIs, Authentication APIs etc.
