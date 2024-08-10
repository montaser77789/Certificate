import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import logo from "../assets/logo spiltm black.png"; 

const CertificateOfPurchase = () => {
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [quantityPurchased, setQuantityPurchased] = useState("");

  const handleAddCertificate = () => {
    // تنسيق النص لمحاكاة شكل الفاتورة
    const certificateText = 
     `
                                    2024-08-10 15:32

Certificate of Purchase

This is to certify that Mr.${customerName},
residing in Riyadh and contactable at phone number 0500815617,

has purchased the following product from our Spiltm:

Product Name: ${productName}
Order Number: ${orderNumber}
Purchase Date: August 21, 2023
Quantity Purchased: ${quantityPurchased}

The full payment for this purchase has been received from Mr.${customerName},
and the requested product has been provided to him.

This certificate serves as the official proof of the completed purchase transaction between our Spiltm and him.

Please accept our highest regards.

`;

    // إنشاء ملف نصي
    const blob = new Blob([certificateText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.txt"; // اسم الملف الذي سيتم تنزيله
    a.click();
    URL.revokeObjectURL(url); // تنظيف الرابط بعد تنزيله
  };


  return (
    <div className="min-h-screen flex items-center justify-center flex-wrap">
      <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg mt-6">
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <Input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <Input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            placeholder="Order Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
          <Input
            placeholder="Quantity Purchased"
            value={quantityPurchased}
            onChange={(e) => setQuantityPurchased(e.target.value)}
          />
          <Button onClick={handleAddCertificate}>Submit</Button>
        </form>
      </div>
      <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
        <div className="text-right text-gray-500 text-xs sm:text-sm">
          2024-08-10 15:32
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-left my-4">
          Certificate of Purchase
        </h1>
        <p className="text-base sm:text-lg my-4 text-left">
          This is to certify that <span className="font-bold">Mr. {customerName}</span>, 
          residing in Riyadh and contactable at phone number <a href="tel:0500815617" className="text-blue-600 underline">0500815617</a>, 
          has purchased the following product from our Spiltm:
        </p>
        <ul className="text-base sm:text-lg mb-4 text-left">
          <li><span className="font-bold">Product Name:</span> {productName}</li>
          <li><span className="font-bold">Order Number:</span> {orderNumber}</li>
          <li><span className="font-bold">Purchase Date:</span> August 21, 2023</li>
          <li><span className="font-bold">Quantity Purchased:</span> {quantityPurchased}</li>
        </ul>
        <p className="text-base sm:text-lg my-4 text-left">
          The full payment for this purchase has been received from <span className="font-bold">Mr. {customerName}</span>, 
          and the requested product has been provided to him.
        </p>
        <p className="text-base sm:text-lg my-4 text-left">
          This certificate serves as the official proof of the completed purchase transaction between our Spiltm and him.
        </p>
        <p className="text-base sm:text-lg my-4 text-left">Please accept our highest regards.</p>
        <div className="flex justify-end">
          <img className="w-28 h-28 sm:w-36 sm:h-36" src={logo} alt="Company Logo"/>
        </div>
      </div>
    </div>
  );
};

export default CertificateOfPurchase;
