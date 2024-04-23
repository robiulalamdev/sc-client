import { DownloadSimple } from "@phosphor-icons/react";
import React from "react";

const PlanBilling = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="border p-6 rounded-2xl">
          <p className="text-base font-semibold mb-4">Billing Details</p>
          <table className="w-full text-slate-700 text-sm font-normal">
            <tbody>
              <tr>
                <td className="border-b py-4">Current Plan</td>
                <td className="border-b">Pro Plan</td>
              </tr>
              <tr>
                <td className="border-b py-4">Subscription Date</td>
                <td className="border-b">April 26, 2024</td>
              </tr>
              <tr>
                <td className="border-b py-4">Renewal Date</td>
                <td className="border-b">April 26, 2025</td>
              </tr>
              <tr>
                <td className="py-4">Renewal Amount</td>
                <td>A$384.44</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border p-6 rounded-2xl">
          <p className="text-base font-semibold">Payment Method</p>
          <table className="w-full text-slate-700 text-sm font-normal">
            <tbody>
              <tr>
                <td className="border-b py-4">Payment Method</td>
                <td className="border-b">PayPal</td>
              </tr>
              <tr>
                <td className="border-b py-4">Billing Interval</td>
                <td className="border-b">Annually</td>
              </tr>
              <tr>
                <td className="border-b py-4">Name</td>
                <td className="border-b">James</td>
              </tr>
              <tr>
                <td className="py-4">Email</td>
                <td>james@example.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="border p-6 rounded-2xl">
        <p className="text-base font-semibold mb-4">Invoice History</p>
        <table className="w-full text-slate-700 text-sm font-normal">
          <thead>
            <tr>
              <th className="border-t py-4 text-start">Bill Date</th>
              <th className="border-t text-start">Amount</th>
              <th className="border-t text-start">Status</th>
              <th className="border-t"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t py-4">October 1, 2023</td>
              <td className="border-t">A$384.00</td>

              <td className="border-t">Paid</td>
              <td className="border-t">
                <button className="text-indigo-600">
                  <DownloadSimple size={20} />
                </button>
              </td>
            </tr>
            <tr>
              <td className="border-t py-4">September 1, 2023</td>
              <td className="border-t">A$384.00</td>

              <td className="border-t">Paid</td>
              <td className="border-t">
                <button className="text-indigo-600">
                  <DownloadSimple size={20} weight="bold" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanBilling;
