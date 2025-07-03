// components/SponsorModal.js
export default function SponsorModal({ onClose }) {
  const bankDetails = [
    {
      bank: "Using Espees",
      name: "KMP",
      account: "1234567890",
    },
    {
      bank: "Parallex Bank",
      name: "Loveworld Media Productions Teaching",
      account: "2030064365",
    },
    // {
    //   bank: "Zenith Bank",
    //   name: "LoveToons Foundation",
    //   account: "5678901234",
    // },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-luckiest font-bold mb-6 text-center text-cyan-700">
        Sponsor LoveToons TV
      </h2>
      <div className="space-y-6">
        <p className="text-gray-700">
          Your generous support helps us continue reaching out to millions of Children all over the world. Here
          are our official bank details:
        </p>

        <div className="space-y-4">
          {bankDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <h3 className="font-bold font-luckiest tracking-wide  text-lg text-amber-800">{detail.bank}</h3>
              <p className="text-gray-600">{detail.name !== "KMP" ? "Account Name:" : "Recipient Code:" } {detail.name}</p>
              {detail.name !== "KMP" && (<p className="text-gray-600 ">Account Number: <span className="text-lg font-medium">{detail.account}</span></p>)}
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