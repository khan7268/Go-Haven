import React from 'react';

export default function CancelBooking({ booking, onCancel, onClose }) {
    return (
        <div className="fixed inset-0 bg-gray bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 ">
            <div className="bg-white bg-opacity-90  p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Cancel Booking?</h2>
                <p className="mb-6 text-gray-600">Are you sure you want to cancel this booking?</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel} // Confirm cancellation
                        className="bg-[#F5385D] hover:bg-[#e02649] cursor-pointer text-white px-4 py-2 rounded"
                    >
                        Yes, Cancel
                    </button>
                    <button
                        onClick={onClose} // Close without cancellation
                        className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 px-4 py-2 rounded"
                    >
                        No, Go Back
                    </button>
                </div>
            </div>
        </div>

    );
}
