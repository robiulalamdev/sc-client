import React, { useEffect, useState } from "react";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PK, STRIPE_SK } from "../../config/config";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateUserSettingsMutation } from "../../features/auth/authApi";
import Swal from "sweetalert2";

import {
  CardElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";

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

const PurchaseCreditComp = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [countryNames, setCountryNames] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    nationality: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [updateUserSettings, { isLoading }] = useUpdateUserSettingsMutation();

  const { credit } = useParams();
  const billingHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      BillingName: "BillingName",
    };

    if (!stripe) {
      console.log("There is no stripe ", stripe);
      setLoading(false);
      return;
    }

    try {
      const clientSecret = await createPaymentIntent(
        Number(credit * 11.5) * 100,
        "usd"
      );

      const cardElement = elements.getElement(CardNumberElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            type: "card",
            card: cardElement,
            billing_details: {
              name: `${user?.name}`,
              address: {
                country: formData?.nationality,
                postal_code: formData?.zip,
              },
            },
          },
        }
      );

      if (error) {
        console.error("error", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.message}`,
        });
        setLoading(false);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Success", paymentIntent);

        const updateRes = await updateUserSettings({
          credit: Number(credit) + Number(user?.credit),
        });

        if (updateRes?.error?.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${res?.error?.error}`,
          });
        }
        if (updateRes?.error?.data?.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${res?.error?.data?.message}`,
          });
        }
        if (updateRes?.data?.success) {
          navigate("/user");
        }

        setLoading(false);
      }
    } catch (error) {
      console.log("Error,", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.message}`,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
      )
      .then(function (response) {
        setCountryNames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="max-w-[475px] m-auto mt-12">
      <div className="mb-4">
        <label className="text-sm text-[#4F5B76] block mb-1">
          Card number{" "}
        </label>
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
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-[#4F5B76] block mb-1">Country</label>

          <select
            className="payment_input"
            name="nationality"
            onChange={handleInputChange}
          >
            <option disabled selected>
              {" "}
              Select country
            </option>
            {countryNames.map((name, index) => (
              <option value={name.code} key={index}>
                {name.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm text-[#4F5B76] block mb-1">
            Postal code
          </label>
          <input
            className="payment_input"
            type="number"
            placeholder="90210"
            name="zip"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button
        onClick={billingHandler}
        disabled={loading || !stripe || !formData.nationality || !formData.zip}
        className="bg-indigo-600 rounded-full text-base font-semibold text-white px-6 py-3"
      >
        {loading ? "Paying..." : `Pay $${credit * 11.5}`}
      </button>
    </div>
  );
};

function PurchaseCredit() {
  const stripePromise = loadStripe(STRIPE_PK);

  return (
    <>
      <Elements stripe={stripePromise}>
        <PurchaseCreditComp />
      </Elements>
    </>
  );
}

export default PurchaseCredit;

const createPaymentIntent = async (amountInCents, currency) => {
  const stripe = Stripe(STRIPE_SK);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amountInCents),
      currency,
    });

    return paymentIntent.client_secret;
  } catch (error) {
    console.error("Error on createPayment intent", error);
    throw new Error("Failed to create PaymentIntent");
  }
};
