import axios from "axios";
import React, { useState } from "react";
import { ApiUrl } from "../../../../helpers/ApiUrl";

const CommentSection = ({articleId}) => {
  
  const[formData, setFormData] = useState({
    articleName: articleId,
    commentOwner: "",
    comment: ""
  })

  const articleUrl = window.location.href;


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.commentOwner.trim() === "" || formData.comment.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

     await axios.post(`${ApiUrl}/post_comment`, formData)

  

    alert(`Thank you, ${formData.commentOwner}! Your comment has been posted.`);

    setFormData({
      articleName: articleId, // Ensure articleId is maintained
      commentOwner: "",
      comment: "",
    });

     window.location.href = `/post_cooments/${articleId}`
    
  };

  return (
    <div className="container mt-4">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "600px", margin: "auto", borderRadius: "10px" }}
      >
        {/* Title */}
        <h5 className="mb-3 text-primary">
          <i className="bi bi-chat-dots me-2"></i> Make a Comment
        </h5>

        {/* Comment Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="commenterName" className="form-label fw-bold">
              Your Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="commentOwner"
              name="commentOwner"
              placeholder="Enter your name"
              value={formData.commentOwner}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="commentText" className="form-label fw-bold">
              Your Comment:
            </label>
            <textarea
              className="form-control"
              id="comment"
              name="comment"
              rows="3"
              placeholder="Write your comment..."
              value={formData.comment}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-send me-2"></i>Post Comment
          </button>
        </form>

        {/* Divider */}
        <hr className="my-4" />

        {/* Share Article */}
        <h6 className="mb-3 text-success">
          <i className="bi bi-share-fill me-2"></i> Share this Article
        </h6>
        <div className="d-flex gap-3 flex-wrap">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              articleUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm"
          >
            <i className="bi bi-facebook"></i> Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              articleUrl
            )}&text=Check%20out%20this%20article!`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info btn-sm"
          >
            <i className="bi bi-twitter"></i> X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              articleUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm"
          >
            <i className="bi bi-linkedin"></i> LinkedIn
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=Check%20out%20this%20article:%20${encodeURIComponent(
              articleUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-success btn-sm"
          >
            <i className="bi bi-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
