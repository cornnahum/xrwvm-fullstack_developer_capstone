import React, { useState } from "react";
import { useParams } from "react-router-dom";

const PostReview = () => {
  const { id } = useParams(); // Get the dealer ID from the URL
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3030/insert_review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dealership: id,
          review,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      alert("Review submitted successfully!");
      setReview("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Post a Review for Dealer {id}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PostReview;