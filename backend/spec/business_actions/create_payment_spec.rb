require 'rails_helper'
require 'stripe'

VALID_PARAMS = {
  amount: 100,
  card_number: '123',
  card_exp_month: '02',
  card_exp_year: '23',
  card_cvc: '222'
}

INVALID_PARAMS = {}

RSpec.describe CreatePayment do
  include Shoulda::Matchers::ActiveModel

  subject(:action) { described_class.new(params) }

  describe 'validations' do
    subject { described_class.new }

    it { is_expected.to validate_presence_of(:amount) }
    it { is_expected.to validate_presence_of(:card_number) }
    it { is_expected.to validate_presence_of(:card_exp_month) }
    it { is_expected.to validate_presence_of(:card_exp_year) }
    it { is_expected.to validate_presence_of(:card_cvc) }
  end

  describe '#perform!' do
    describe 'when everything goes well' do
      let(:params) { VALID_PARAMS }

      it 'creates a stripe payment method, a payment intent and saves the payment' do
        allow(Stripe::PaymentMethod).to receive(:create).with(
          type: :card,
          card: {
            number: VALID_PARAMS.fetch(:card_number),
            exp_month: VALID_PARAMS.fetch(:card_exp_month),
            exp_year: VALID_PARAMS.fetch(:card_exp_year),
            cvc: VALID_PARAMS.fetch(:card_cvc)
          }
        ).and_return(double(id: 2))

        allow(Stripe::PaymentIntent).to receive(:create).with(
          amount: VALID_PARAMS.fetch(:amount) * 100,
          currency: :usd,
          payment_method_types: %w[card],
          confirm: true,
          payment_method: 2
        ).and_return(double(id: 3, status: :some_status))

        expect(Payment).to receive(:create!).with(
          amount: VALID_PARAMS.fetch(:amount),
          stripe_id: 3,
          status: :some_status
        ).and_return('something')

        expect(subject.perform!).to eq('something')
      end
    end

    describe 'when Stripe raises an error during payment method creation' do
      before do
        allow(Stripe::PaymentMethod).to receive(:create).and_raise(Stripe::StripeError)
        subject.perform!
      end

      let(:params) { VALID_PARAMS }

      it 'invalidates the action' do
        expect(subject.failed_perform?).to be_truthy
        expect(subject.perform_phase_errors.count).to eq(1)
        expect(subject.perform_phase_errors[:base]).to include('Error while creating payment method')
      end
    end

    describe 'when Stripe raises an error during payment intent creation' do
      before do
        allow(Stripe::PaymentMethod).to receive(:create).with(
          type: :card,
          card: {
            number: VALID_PARAMS.fetch(:card_number),
            exp_month: VALID_PARAMS.fetch(:card_exp_month),
            exp_year: VALID_PARAMS.fetch(:card_exp_year),
            cvc: VALID_PARAMS.fetch(:card_cvc)
          }
        ).and_return(double(id: 1))

        allow(Stripe::PaymentIntent).to receive(:create).with(
          amount: VALID_PARAMS.fetch(:amount) * 100,
          currency: :usd,
          payment_method_types: %w[card],
          confirm: true,
          payment_method: 1
        ).and_raise(Stripe::StripeError)

        subject.perform!
      end

      let(:params) { VALID_PARAMS }

      it 'invalidates the action' do
        expect(subject.failed_perform?).to be_truthy
        expect(subject.perform_phase_errors.count).to eq(1)
        expect(subject.perform_phase_errors[:base]).to include('Error while creating payment intent')
      end
    end
  end
end
