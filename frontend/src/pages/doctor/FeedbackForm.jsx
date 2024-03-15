import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(token);
      // Validate rating and reviewText
      if (!rating || !reviewText) {
        setLoading(false);
        return toast.error("Rating & Review Fields are required");
      }

      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      // Handle success
      setLoading(false);
      toast.success("Review submitted successfully");

      // You might want to update your UI or take further actions upon successful review submission
      // Example: display a success message or navigate to a different page
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <form action="">
        <div>
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
            How would you rate the overall experience?*
          </h3>
          <div>
            {[...Array(5).keys()].map((_, index) => {
              index += 1;

              return (
                <button
                  key={index}
                  type="button"
                  className={`${
                    index <= ((hover && rating) || hover)
                      ? "text-yellowColor"
                      : "text-gray-400"
                  } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index + 1)}
                  onMouseLeave={() => setHover(rating)}
                  onDoubleClick={() => {
                    setHover(0);
                    setRating(rating);
                  }}
                >
                  <span>
                    <AiFillStar />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-[30px]">
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
            Share your feedback or suggestions*
          </h3>
          <textarea
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-3 rounded-md"
            rows="3"
            placeholder="Write your message*"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <button className="btn" type="submit" onClick={handleSubmitReview}>
            {loading ? (
              <HashLoader size={25} color="#fff" />
            ) : (
              "Submit-Feedback"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
