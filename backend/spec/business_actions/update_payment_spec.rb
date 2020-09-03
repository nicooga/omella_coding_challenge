require 'rails_helper'

RSpec.describe UpdatePayment do
  include Shoulda::Matchers::ActiveModel

  subject(:action) { described_class.new(params).perform! }

  let(:params) { { stripe_id: :some_id, status: :succeeded } }

  describe 'validations' do
    subject { described_class.new }

    it { is_expected.to validate_presence_of(:stripe_id) }
    it { is_expected.to validate_presence_of(:status) }
    it { is_expected.to validate_inclusion_of(:status).in_array(Payment::STATUSES.flat_map { |s| [s, s.to_s] }) }
  end

  # Unit testing done so hard is practically useless, I know.
  # I just don't want to deal with the DB at all.
  it 'updates the payment' do
    collection = instance_double(ActiveRecord::Relation)
    expect(Payment).to receive(:where).with(stripe_id: :some_id).and_return(collection)
    expect(collection).to receive(:update_all).with(status: :succeeded).and_return(nil)
    subject
  end
end
