import React from "react";
import convertTime from "../../utils/convertTime";
import { BASE_URL } from "../../config";

const Sidepanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Assuming there is a session URL in the response data
        if (data.session && data.session.url) {
          window.location.href = data.session.url;
        }
      } else {
        throw new Error(data.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      // Assuming 'toast' is a function for displaying error messages
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} BDT
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul>
          {timeSlots?.map((item, index) => (
            <li key={index}>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={bookingHandler} className="btn px-2 w-full mt-6">
        Book Appointment
      </button>
    </div>
  );
};

export default Sidepanel;
