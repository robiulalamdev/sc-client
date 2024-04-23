import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK } from "../../config/config";
import {
  useGetSubscriptionInvoicesQuery,
  useSubscriptionPlanMutation,
} from "../../features/auth/authApi";
import { useState } from "react";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      color: "#000",
      fontSize: "16px",
    },
    fontWeight: 400,
    width: "100%",

    invalid: {
      iconColor: "#ffc7ee",
      color: "#f00101",
    },
  },
};

function Subscription() {
  const stripe = useStripe();
  const elements = useElements();
  const [subscriptionPlan] = useSubscriptionPlanMutation();
  const [customerId, setCustomerId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //   const { data } = useGetSubscriptionInvoicesQuery(customerId);

  const createSubscription = async () => {
    try {
      setIsLoading(true);
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });

      const result = await subscriptionPlan({
        plan: "month", // Assuming you have a plan named 'month'
        amount: 500, // Amount in cents ($5.00)
        paymentMethod: paymentMethod.paymentMethod.id,
      });

      if (!result?.data.success) return alert("Payment unsuccessful!");

      const confirm = await stripe.confirmCardPayment(
        result?.data.clientSecret
      );
      console.log(result);
      console.log(confirm);
      //   if(result?.data?.success){
      //     setCustomerId(result?.data)
      //   }
      if (confirm.error) return alert("Payment unsuccessful!");

      alert("Payment Successful! Subscription active.");
    } catch (err) {
      console.error(err);
      alert("Payment failed! " + err.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-[475px] m-auto mt-12">
      <div className="mb-4">
        <label className="text-sm text-[#4F5B76] block mb-1">Card number</label>
        <CardNumberElement
          className="payment_input"
          options={{
            ...CARD_OPTIONS,
            placeholder: "Enter card number",
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[#4F5B76] block mb-1">Expiry</label>
          <CardExpiryElement className="payment_input" options={CARD_OPTIONS} />
        </div>
        <div>
          <label className="text-sm text-[#4F5B76] block mb-1">CVC</label>
          <CardCvcElement className="payment_input" options={CARD_OPTIONS} />
        </div>
      </div>

      <button
        onClick={createSubscription}
        disabled={isLoading}
        className="bg-indigo-600 rounded-full text-base font-semibold text-white px-6 py-3"
      >
        {isLoading ? "Paying..." : "Pay $5.00"}
      </button>
    </div>
  );
}

const ElementWrapper = () => {
  const stripePromise = loadStripe(STRIPE_PK);
  return (
    <Elements stripe={stripePromise}>
      <Subscription />
    </Elements>
  );
};
export default ElementWrapper;
