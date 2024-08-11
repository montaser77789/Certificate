import { useState } from "react";
import Button from "./ui/Button";
import UseAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import axioInstance from "./config/config.instance";
import { successmsg } from "../toastifiy";

interface Certificate {
  _id: string;
  name: string;
  pdf: string;
  __v: number;
}

const DisplayCertificate: React.FC<{ updateKey: number }> = ({ updateKey }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updateCer, setUpdateCer] = useState(0);

  const { data, isLoading } = UseAuthenticatedQuery({
    queryKey: [`certificates${ updateKey+updateCer }`],
    url: "/app/pdf/get_pdfs",
  });

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("File ID is missing.");
      return;
    }
  
    setDeletingId(id);
  
    try {
       await axioInstance.delete(`/app/pdf/delete_pdf/${id}`);
      successmsg({ msg: "Certificate deleted successfully" });
      setUpdateCer(prev => prev + 1);
    } catch (error) {
      console.error("Error deleting certificate:", error);
    } finally {
      setDeletingId(null);
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((cert: Certificate) => (
          <div key={cert._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{cert.name}</h2>
            <div className="flex gap-5 justify-center items-center">
              <a
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View PDF
              </a>
              <Button
              variant={"danger"}
                isloading={deletingId === cert._id}
                onClick={() => handleDelete(cert._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCertificate;
