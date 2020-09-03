const BACKEND_URL = 'http://localhost:3000'

type CreatePaymentArguments = {
  creditCard: CreditCard,
  amount: string
};

// A service object that interacts with the Rails backend.
const Backend = {
  async createPayment({ creditCard, amount }: CreatePaymentArguments): Promise<BackendResponse<Payment>> {
    const { number, expMonth, expYear, cvc } = creditCard;

    // Here I could used a library like axios but I think
    // `fetch` is good enough for this simple use case.
    const response =
      await fetch(`${BACKEND_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          card_number: number,
          card_exp_month: expMonth,
          card_exp_year: expYear,
          card_cvc: cvc
        })
      });

    return await response.json();
  },

  async getPayments(): Promise<BackendResponse<Payment[]>> {
    const response = await fetch(`${BACKEND_URL}/payments`);
    return await response.json();
  }
};

export default Backend;
