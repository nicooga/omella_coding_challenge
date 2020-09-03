class UpdatePayment < BusinessAction
  attr_accessor :stripe_id, :status

  validates :stripe_id, :status, presence: true
  validates :status, inclusion: { in: Payment::STATUSES.flat_map { |s| [s, s.to_s] } }

  private

  def do_perform
    Payment.where(stripe_id: stripe_id).update_all(status: status)
  end
end
