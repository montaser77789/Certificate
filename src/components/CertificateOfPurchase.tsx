import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import logo from "../assets/logo spiltm black.png"; 
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DisplayCertificate from "./DisplayCertficate";
import axioInstance from "./config/config.instance";
import { successmsg } from "../toastifiy";

const CertificateOfPurchase = () => {
  const [customerName, setCustomerName] = useState("");
  const [productName, setProductName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [PurchaseDate , setPurchaseDate ] = useState("");
  const [quantityPurchased, setQuantityPurchased] = useState("");
  const [phoneNumber , setPhoneNumber] = useState("");
  const [customerCity , setCustomerCity] = useState("");
  const currentDate = new Date().toLocaleString();
  const [isLoading, setIsLoading] = useState(false);
  const [updateCer , setUpdateCer] = useState(0);

  const handleDownloadPDF = () => {
    setIsLoading(true);
    const input = document.getElementById("certificate");
  
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
  
        // تحديد أبعاد مخصصة للـ PDF
        const pdfWidth = canvas.width * 0.75; // تصغير العرض بنسبة 75%
        const pdfHeight = canvas.height * 0.75; // تصغير الطول بنسبة 75%
  
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [pdfWidth, pdfHeight] // استخدم الأبعاد الجديدة لتنسيق الصفحة
        });
  
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
  
        let yOffset = 0;
        let remainingHeight = pdfHeight;
  
        while (remainingHeight > 0) {
          pdf.addImage(imgData, "PNG", 0, yOffset, pageWidth, Math.min(pageHeight, remainingHeight));
          remainingHeight -= pageHeight;
          yOffset -= pageHeight;
  
          if (remainingHeight > 0) {
            pdf.addPage(); // أضف صفحة جديدة إذا كان هناك المزيد من المحتوى
          }
        }
  
        const pdfBlob = pdf.output("blob");
  
        const formData = new FormData();
        formData.append("file", pdfBlob);
        formData.append("name", customerName);
  
        axioInstance.post("/app/pdf/upload_pdf", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully:", response.data);
          successmsg({msg:"Certificate uploaded successfully"})
          setIsLoading(false);
          setCustomerName("");
          setProductName("");
          setOrderNumber("");
          setPurchaseDate("");
          setQuantityPurchased("");
          setPhoneNumber("");
          setCustomerCity("");

          setUpdateCer(prev => prev + 1); // تحديث البيانات بعد الإضافة
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setIsLoading(false);
        });
      });
    }
  };
  

  return (
    <div className="min-h-screen flex items-center gap- justify-center flex-wrap">
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
          <Button isloading={isLoading} onClick={handleDownloadPDF}>Upload PDF</Button>
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
      <DisplayCertificate updateKey={updateCer}/>

    </div>
  );
};

export default CertificateOfPurchase;
