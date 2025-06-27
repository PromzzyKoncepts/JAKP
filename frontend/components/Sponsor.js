// components/SponsorModal.js
export default function SponsorModal({ onClose }) {
  const bankDetails = [
    {
      bank: "First Bank",
      name: "LoveToons Media",
      account: "1234567890",
    },
    {
      bank: "GTBank",
      name: "LoveToons TV",
      account: "0987654321",
    },
    {
      bank: "Zenith Bank",
      name: "LoveToons Foundation",
      account: "5678901234",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-cyan-700">
        Sponsor LoveToons TV
      </h2>
      <div className="space-y-6">
        <p className="text-gray-700">
          Your generous support helps us continue creating quality content. Here
          are our bank details:
        </p>

        <div className="space-y-4">
          {bankDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <h3 className="font-bold text-lg text-gray-800">{detail.bank}</h3>
              <p className="text-gray-600">Account Name: {detail.name}</p>
              <p className="text-gray-600">Account Number: {detail.account}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}