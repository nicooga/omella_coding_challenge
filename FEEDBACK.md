# Overall

Thank you for this coding challenge. Overall we like it and are going to consider it in our final
decision regarding whether to extend an offer. Thanks for taking the time to do this assignment and
we will get back to you soon!

- Simple implementation, on a simple project structure, did the homework -> covers most of the challenge expectations
- Liked the detailed README
- Easy to run

# Back End

- Business action (Service Objects?) - liked, pretty much the same pattern we use
- Interesting ActionController / API controller approach
- Nice detail adding the web hook implementation
- Could use a better error handling approach, all the errors are rescued with a generic error message when doing a payment
- Good specs on the business actions
- Issue with processing payment:
  - Plain payment method data transport / Would be better to implement Stipe.js on the FE 
    > Started POST "/payments" for ::1 
    > Processing by PaymentsController#create as */*
    > Parameters: {"amount"=>"122", "card_number"=>"4242424242424242", "card_exp_month"=>"12", "card_exp_year"=>"23", "card_cvc"=>"123", "payment"=>{}}
    > (Status 400) (Request req_EYMwO77I8Ec2Wc) You must verify a phone number on your Stripe account before you can send raw credit card numbers to the Stripe API. You can avoid 
    > this requirement by using Stripe.js, the Stripe mobile bindings, or Stripe Checkout. For more information, see https://dashboard.stripe.com/phone-verification.
    > Completed 500 Internal Server Error in 1100ms (Views: 0.1ms | ActiveRecord: 0.0ms | Allocations: 1566)
  - (Better Error handling would make this ^ easier to catch)
  - In general we (and Stripe) recommend an approach where the backend doesn't ever touch raw credit card numbers. 
    The reasons are for PCI compliance / better security. 

# Front End

- Typescript :+1:
- Simple "Service Object" as API on the frontend, does the job, looks a bit "rails-like" which is different but cool
- Styled components :+1: 
- Good component design
- Would have liked to see
  - More robust FE implementation, hooks? contexts? SSR? -- too simple, it does the job, but hard to evaluate "react proficiency"
  - FE tests -> it seems like the implementation doesn't require it due to simplicity. (But would be nice to see
    both more showcasing of FE skills + the test coverage that would entail)
    - Maybe a spec on the payment hook or the payment form would be called for here
  - Some security patterns, at least API security
  - Would have liked at least 2 scenes with routes to see some navigation implementation

