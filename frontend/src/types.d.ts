type CreditCard = {
  number?: string,
  expMonth?: string,
  expYear?: string,
  cvc?: string
}

type Payment = {
  id?: string,
  status?:
    | 'unknown'
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_action'
    | 'processing'
    | 'requires_capture'
    | 'canceled'
    | 'succeeded',
  amount?: number,
  stripe_id?: string,
  created_at?: string
}

type BackendResponseErrorMessages = { [attribute: string]: string[] };

interface ErroredBackendResponse {
  success: false, // a literal type here allows use to do type refinement later
  errors?: BackendResponseErrorMessages;
  error: string
}

interface SuccesfulBackendResponse<T> {
  success: true, // same here, for type refinement
  data: T
}

type BackendResponse<T> = SuccesfulBackendResponse<T> | ErroredBackendResponse;
