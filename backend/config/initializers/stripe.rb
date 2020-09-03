require 'stripe'
Stripe.api_key = ENV.fetch('STRIPE_PUBLISHABLE_KEY')
