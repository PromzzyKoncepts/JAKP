// components/PrayerModal.js
export default function PrayerModal({ onClose }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
        Prayer of Salvation
      </h2>
      <div className="space-y-4 text-gray-700">
        <p>
          O lord God, I believe with all my heart in Jesus Christ, Son of the Living  God.
        </p>
        <p>
          I believe He died for me and God raised Him from the dead. I believe He's alive today.
          I confess with my mouth, that Jesus Christ is the Lord of my life from this day.
        </p>
        <p>
          Through Him and in His name I have Eternal life
        </p>
        <p>
          I AM BORN AGAIN!
        </p>
        <p>
          Thank you Lord, for saving my soul.
          I am now a child of God
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