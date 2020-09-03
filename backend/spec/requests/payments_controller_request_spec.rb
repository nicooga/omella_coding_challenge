require 'rails_helper'

RSpec.describe "PaymentsControllers", type: :request do
  describe 'webhook' do
    subject do
      post '/payments/webhook', params: {
        type: event_type, data: { object: { id: stripe_id, status: status } }
      }
    end

    let(:stripe_id) { 'someid' }
    let(:status) { 'someid' }

    describe 'when event type is payment_intent.succeeded' do
      let(:event_type) { 'payment_intent.succeeded' }

      it 'delegates to UpdatePayment' do
        action = instance_double(UpdatePayment)
        expect(UpdatePayment).to receive(:new).with(stripe_id: stripe_id, status: status).and_return(action)
        expect(action).to receive(:perform!)
        subject
      end
    end

    describe 'when event type is not payment_intent.succeeded' do
      let(:event_type) { 'something else' }

      it 'does nothing' do
        expect(UpdatePayment).not_to receive(:new)
      end
    end
  end

  describe 'creating a payment' do
    subject { post '/payments', params: params }

    let(:action) do
      instance_double(
        CreatePayment,
        valid?: valid,
        perform!: action_result,
        failed_perform?: failed_perform?
      ).tap do |a|
        allow(a)
          .to receive_message_chain(:errors, :messages, :as_json)
          .and_return(errors)

        allow(a)
          .to receive_message_chain(:perform_phase_errors, :messages, :as_json)
          .and_return(perform_phase_errors)
      end
    end
    let(:errors) { { some: ['errors'] } }
    let(:params) do
      {
        'amount': '1',
        'card_number': '2',
        'card_exp_month': '02',
        'card_exp_year': '2024'
      }
    end
    let(:action_result) { :some_result }
    let(:failed_perform?) { false }
    let(:perform_phase_errors) { { other: ['errors'] }}

    before do
      allow(CreatePayment).to receive(:new).and_return(action)
    end

    describe 'when CreatePayment paratemer validation fails' do
      let(:valid) { false }

      it 'returns an error list' do
        expect(CreatePayment).to receive(:new).with(params)
        subject
        expect(response).to have_http_status 422
        expect(response.body).to eq({ success: false, errors: errors }.to_json)
      end
    end

    describe 'when CreatePayment paratemer validation suceeds and action does not fail during perform' do
      let(:valid) { true }
      let(:failed_perform?) { false }

      it 'returns an error list' do
        expect(CreatePayment).to receive(:new).with(params)
        subject
        expect(response).to have_http_status 200
        expect(response.body).to eq({ success: true, data: 'some_result' }.to_json)
      end
    end

    describe 'when CreatePayment paratemer validation suceeds and action fails during perform' do
      let(:valid) { true }
      let(:failed_perform?) { true }

      it 'returns an error list' do
        expect(CreatePayment).to receive(:new).with(params)
        subject
        expect(response).to have_http_status 500
        expect(response.body).to eq({ success: false, errors: perform_phase_errors }.to_json)
      end
    end
  end
end
