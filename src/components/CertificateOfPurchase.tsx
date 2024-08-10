import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import logo from "../assets/logo spiltm black.png"; 
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const CertificateOfPurchase = () => {
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [PurchaseDate , setPurchaseDate ] = useState("");
  const [quantityPurchased, setQuantityPurchased] = useState("");
  const [phoneNumber , setPhoneNumber] = useState("");
  const [customerCity , setCustomerCity] = useState("");
  const currentDate = new Date().toLocaleString();

  const handleDownloadPDF = () => {
    const input = document.getElementById("certificate");
  
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
  
        const imgWidth = 170;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        const pageWidth = pdf.internal.pageSize.getWidth();
        const x = (pageWidth - imgWidth) / 2;
  
        pdf.addImage(imgData, "PNG", x, 0, imgWidth, imgHeight);
        pdf.save("certificate_of_purchase.pdf");

  
        const pdfBlob = pdf.output("blob");
  
        const formData = new FormData();
        formData.append("file", pdfBlob, "certificate_of_purchase.pdf");
        formData.append("name", customerName); 
  
        axios.post("http://localhost:300/app/pdf/upload_pdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
      });
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center flex-wrap">
      <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg mt-6">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
           <Input
            placeholder="Customer City"
            value={customerCity}
            onChange={(e) => setCustomerCity(e.target.value)}
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
            placeholder="Purchase Date"
            value={PurchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            type="date"
          />
          <Input
            placeholder="Quantity Purchased"
            value={quantityPurchased}
            onChange={(e) => setQuantityPurchased(e.target.value)}
          />
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
        </form>
      </div>
      <div id="certificate" className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
        <div className="text-right text-gray-500 text-xs sm:text-sm">
        {currentDate}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-left my-4">
          Certificate of Purchase
        </h1>
        <p className="text-base sm:text-lg my-4 text-left">
          This is to certify that <span className="font-bold">{customerName}</span>, 
          residing in {customerCity} and contactable at phone number <a href="tel:0500815617" className="text-blue-600 underline">{phoneNumber}</a>, 
          has purchased the following product from our Spiltm:
        </p>
        <ul className="text-base sm:text-lg mb-4 text-left">
          <li><span className="font-bold">Product Name:</span> {productName}</li>
          <li><span className="font-bold">Order Number:</span> {orderNumber}</li>
          <li><span className="font-bold">Purchase Date:</span> {PurchaseDate}</li>
          <li><span className="font-bold">Quantity Purchased:</span> {quantityPurchased}</li>
        </ul>
        <p className="text-base sm:text-lg my-4 text-left">
          The full payment for this purchase has been received from <span className="font-bold">{customerName}</span>, 
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
