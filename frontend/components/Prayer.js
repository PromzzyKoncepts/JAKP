// components/PrayerModal.js
export default function PrayerModal({ onClose }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
        Prayer of Salvation
      </h2>
      <div className="space-y-4 text-gray-700">
        <p>
          Dear Lord Jesus, I come to You today. I thank you for your unconditional love for me, and I recieve
           forgiveness for all my sins.
        </p>
        <p>
          I believe You died for my sins and rose from the dead. I turn from my
          sins and invite You to come into my heart and life and transform me by your Spirit.
        </p>
        <p>
          I have devoted to trust and follow You as my Lord and Savior. In Your name, I
          pray. Amen.
        </p>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}