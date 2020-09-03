class Payment < ApplicationRecord
  STATUSES = %i[
    unknown
    requires_payment_method
    requires_confirmation
    requires_action
    processing
    requires_capture
    canceled
    succeeded
  ]

  validates :stripe_id, :status, :amount_cents, presence: true
  validates :status, inclusion: { in: STATUSES.flat_map { |s| [s, s.to_s] } }

  def amount
    amount_cents ? amount_cents / 100.0 : nil
  end

  def amount=(number)
    self.amount_cents = number.to_i * 100
  end
end
