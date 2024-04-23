import { DownloadSimple } from "@phosphor-icons/react";
import React from "react";
import { DateConverter } from "../../../utils/converter";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ paymentDatas }) => {
  console.log(paymentDatas, "fgjskf");

  const generatePDF = (item) => {
    const doc = new jsPDF();

    // Invoice header
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    // Invoice details table
    doc.setFontSize(12);
    const startY = 30;
    const startX = 10;
    const lineHeight = 10;
    const columnWidth = 70;

    // Customer Name
    doc.text("Customer:", startX, startY);
    doc.text(item.user.name || "N/A", startX + columnWidth, startY);

    // Amount
    doc.text("Amount:", startX, startY + lineHeight);
    doc.text(
      "$" + (item.amount || "N/A"),
      startX + columnWidth,
      startY + lineHeight
    );

    // Date
    doc.text("Date:", startX, startY + 2 * lineHeight);
    doc.text(
      DateConverter(item.createdAt) || new Date().toLocaleDateString(),
      startX + columnWidth,
      startY + 2 * lineHeight
    );

    // Save the PDF
    doc.save("invoice.pdf");
  };

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="text-sm font-semibold">
            <td className="p-4 ">Bill Date</td>
            <td>Amount</td>
            <td>Amount</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="text-sm font-normal">
          {paymentDatas &&
            paymentDatas?.length > 0 &&
            paymentDatas.map((item, idx) => (
              <tr key={idx}>
                <td className="p-4 border-t">
                  {DateConverter(item.createdAt)}
                </td>
                <td className=" border-t">${item.amount}</td>
                <td className=" border-t">{item.status}</td>
                <td className=" border-t">
                  <DownloadSimple
                    className="text-indigo-600 cursor-pointer"
                    size={20}
                    weight="bold"
                    onClick={() => generatePDF(item)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
