const CertificateOfPurchase = () => {
  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <div className="text-right text-gray-500 text-xs sm:text-sm">
        2024-08-10 15:32
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-left my-4">
        Certificate of Purchase
      </h1>
      <p className="text-base sm:text-lg my-4 text-left">
        This is to certify that <span className="font-bold">Mr. Fahed Al-Qahtani</span>, 
        residing in Riyadh and contactable at phone number <a href="tel:0500815617" className="text-blue-600 underline">0500815617</a>, 
        has purchased the following product from our Spiltm:
      </p>
      <ul className="text-base sm:text-lg mb-4 text-left">
        <li><span className="font-bold">Product Name:</span> Cap Black</li>
        <li><span className="font-bold">Order Number:</span> 4345</li>
        <li><span className="font-bold">Purchase Date:</span> August 21, 2023</li>
        <li><span className="font-bold">Quantity Purchased:</span> 1 unit</li>
      </ul>
      <p className="text-base sm:text-lg my-4 text-left">
        The full payment for this purchase has been received from <span className="font-bold">Mr. Fahed Al-Qahtani</span>, 
        and the requested product has been provided to him.
      </p>
      <p className="text-base sm:text-lg my-4 text-left">
        This certificate serves as the official proof of the completed purchase transaction between our Spiltm and him.
      </p>
      <p className="text-base sm:text-lg my-4 text-left">Please accept our highest regards.</p>
      <div className="text-right mt-8">
        <span className="text-2xl sm:text-3xl font-bold italic">Spiltm</span>
      </div>
    </div>
  );
};

export default CertificateOfPurchase;
