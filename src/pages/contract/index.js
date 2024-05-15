import React, { useState } from "react";
import { jsPDF } from "jspdf";

const ContractGenerator = ({ modalIsOpen, setModalIsOpen }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agreement, setAgreement] = useState("");

  const handleDownload = () => {
    // Create a new PDF document
    const doc = new jsPDF();

    const generateData = function () {
      return [
        {
          id: "1",
          Activity: name,
          Responsibility: phone,
          "Time Plan": "Plan 1",
          "Payment in PKR": "5000",
          "Where to Pay": "Location 1",
        },
        {
          id: "2",
          Activity: address,
          Responsibility: agreement,
          "Time Plan": "Plan 2",
          "Payment in PKR": "7000",
          "Where to Pay": "Location 2",
        },
      ];
    };

    function createHeaders(keys) {
      var result = [];
      // Define widths and alignment for each column
      var widths = [20, 50, 50, 40, 40, 40]; // Adjust as needed
      var aligns = ["left", "left", "left", "left", "left", "left"]; // Adjust as needed
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: keys[i],
          width: widths[i],
          align: aligns[i],
          padding: 0,
          fontStyle: "bold", // Bold the headings
        });
      }
      return result;
    }

    var headers = createHeaders([
      "id",
      "Activity",
      "Responsibility",
      "Time Plan",
      "Payment in PKR",
      "Where to Pay",
    ]);

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    doc.setFont("helvetica", "bold"); // Set font style to bold
    doc.setFontSize(16);
    doc.text(
      "ATLANTIC SERVICES COMPANY PAKISTAN (Reg).",
      doc.internal.pageSize.getWidth() / 2,
      20,
      null,
      null,
      "center"
    ); // Centered and bold text
    doc.setTextColor(150);
    doc.setFont("helvetica", "bold"); // Set font style to bold
    doc.setFontSize(16);
    doc.text(
      "Commercial Proposal",
      doc.internal.pageSize.getWidth() / 2,
      27,
      null,
      null,
      "center"
    ); // Centered and bold text
    doc.setTextColor(0); // Set text color to black
    doc.setFont("helvetica", "bold"); // Reset font style to normal
    doc.setFontSize(10);
    doc.text(12, 40, `Name: ${name}`);
    doc.text(80, 40, `Phone: ${phone}`);
    doc.text(140, 40, `Date: ${currentDate} ${currentTime}`);
    doc.text(12, 50, `Address: ${address}`);
    doc.setFontSize(10);
    doc.table(20, 140, generateData(), headers);

    // Add logo in the center
    const logoUrl = "./images/imbs_logo.png";
    const logoWidth = 25; // Adjust as needed
    const logoHeight = 15; // Adjust as needed
    const centerX = (doc.internal.pageSize.getWidth() - logoWidth) / 2;
    const centerY = (doc.internal.pageSize.getHeight() - logoHeight) / 2;
    // doc.addImage(logoUrl, "PNG", 10, 10, logoWidth, logoHeight);
    doc.setFontSize(10);
    doc.text(
      `
  Dear,
  We are ATLANTIC SERVICES COMPANY PAKISTAN (Reg). Headquartered in Sialkot, Pakistan chamber of 
  commerce office no 29 3rd floor pairs road.Our people are experienced professionals with deep expertise in Pakistan
  corporate services industry. They take the time to understand your needs and deliver solutions that are appropriate, 
  practical, and cost-effective. We charge fixed fees that provide some of the best value in Pakistan corporate services 
  industry. You will know all osts upfront, with no hidden fees or surprises.

  Our mission is to enable SME to accelerate positive change. As a company, we strive for open communication, and we 
  welcome feedback from our customers and teammates. We believe it is the best way to make a positive change. We are
  a team of professionals who always strive to become better — as individuals, employees, business partners, and 
  a company.

  Why do Clients Choose Us?
  • Trustworthy Services Provider
  • Reputed Team
  • Expert Guidance
  • Hundreds of PRO services are available with Us.
  • Available all the Times
  `,
      10,
      56
    );

    doc.setTextColor(0); // Set text color to black
    doc.setFont("helvetica", "bold"); // Reset font style to normal
    doc.setFontSize(12);
    doc.text(12, 138, `Process of Documentations:`);

    // Save the PDF file
    doc.save("contract.pdf");
  };

  return (
    <div>
      {modalIsOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Contract Generator
                    </h3>
                    <div className="mt-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Name:
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </label>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone:
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </label>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Address:
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </label>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Agreement:
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={agreement}
                          onChange={(e) => setAgreement(e.target.value)}
                        ></textarea>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    handleDownload();
                    setModalIsOpen(false);
                  }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => setModalIsOpen(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractGenerator;
