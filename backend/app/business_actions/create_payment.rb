require 'stripe'

class CreatePayment < BusinessAction
  attr_accessor :amount, :card_number, :card_exp_month,
    :card_exp_year, :card_cvc

  validates :amount, :card_number, :card_exp_month,
    :card_exp_year, :card_cvc, presence: true

  validates :card_exp_month, format: /\A0[1-9]|1[0-2]\z/
  validates :card_exp_year, numericality: {
    greater_than_or_equal_to: -> _action { Time.zone.now.year.to_s.last(2).to_i },
    allow_nil: true
  }

  private

  def do_perform
    payment_method =
      begin
        create_payment_method
      rescue Stripe::StripeError => error
        Rails.logger.debug(error)
        perform_phase_errors.add(:base, 'Error while creating payment method')
        return
      end

    payment_intent =
      begin
        create_payment_intent(payment_method.id)
      rescue Stripe::StripeError => error
        Rails.logger.debug(error)
        perform_phase_errors.add(:base, 'Error while creating payment intent')
        return
      end

    Payment.create!(
      amount: amount,
      stripe_id: payment_intent.id,
      status: payment_intent.status
    )
  end

  def create_payment_method
    Stripe::PaymentMethod.create(
      type: :card,
      card: {
        number: card_number,
        exp_month: card_exp_month,
        exp_year: card_exp_year,
        cvc: card_cvc
      }
    )
  end

  def create_payment_intent(payment_method_id)
    Stripe::PaymentIntent.create(
      amount: amount.to_i * 100,
      currency: :usd,
      payment_method_types: %w[card],
      confirm: true,
      payment_method: payment_method_id
    )
  end
end
