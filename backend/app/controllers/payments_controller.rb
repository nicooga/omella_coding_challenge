require 'stripe'

class PaymentsController < ApplicationController
  # We typically would need filtering, pagination and authorization here.
  #
  # Also, abstractions like GQL and JSONAPI that permit (or require)
  # to select explicitly returned fields would come in handy to save bandwith.
  #
  # None of this is needed for this simple example.
  def index
    respond_with_data Payment.order(created_at: :desc).all, methods: :amount
  end

  def create
    action_params = params.slice(:amount, :card_number, :card_exp_month, :card_exp_year, :card_cvc).permit!.to_h
    respond_with_action CreatePayment.new(action_params)
  end

  def webhook
    return unless params.fetch(:type) === 'payment_intent.succeeded'

    stripe_id = params.dig(:data, :object, :id)
    status = params.dig(:data, :object, :status)

    UpdatePayment.new(stripe_id: stripe_id, status: status).perform!
  end
end
