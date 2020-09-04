import { useState, useCallback } from 'react';
import Backend from '../../Backend';

type PerformArgs = {
  creditCard: CreditCard,
  amount?: string
};

// This could be a generalizable pattern if the API response format remained consistent across different endpoints.
// By the way, this looks to me like a functional version of the command object pattern.
const usePaymentCreation = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<BackendResponseErrorMessages>({});

  const perform = useCallback(async ({ creditCard, amount }: PerformArgs) => {
    setErrors({});
    setSubmitting(true);

    try {
      const response = await Backend.createPayment({ creditCard, amount: amount!  });

      if (response.success) {
        return response.data;
      } else if (typeof response.errors === 'object') {
        throw response.errors;
      } else if (response.error) {
        throw { base: [response.error] };
      } else {
        throw undefined;
      }
    } catch(newErrors) {
      const actualErrors = newErrors || { base: ['Something went wrong ... :('] }
      setErrors(actualErrors)
      throw actualErrors;
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { perform, errors, submitting };
};

export default usePaymentCreation;
