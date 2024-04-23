import React from "react";

const PaymentDetails = () => {
  return (
    <div>
      {" "}
      <p className="text-base font-semibold">Payment Method</p>
      <table className="w-full text-slate-700 text-sm font-normal">
        <tbody>
          <tr>
            <td className="border-b">Payment Method</td>
            <td className="border-b">PayPal</td>
            <td className="border-b text-end">
              <button className="font-semibold text-indigo-600 py-4">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td className="border-b">Billing Interval</td>
            <td className="border-b">Annually</td>
            <td className="border-b text-end">
              <button className="font-semibold text-indigo-600 py-4">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td className="border-b">Name</td>
            <td className="border-b">James</td>
            <td className="border-b text-end">
              <button className="font-semibold text-indigo-600 py-4">
                Edit
              </button>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>james@example.com</td>
            <td className="text-end">
              <button className="font-semibold text-indigo-600 py-4">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentDetails;
