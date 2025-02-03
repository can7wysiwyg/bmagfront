import axios from "axios";
import React, { useState, useEffect } from "react";
import { ApiUrl } from "../../../../helpers/ApiUrl";
import { Link } from "react-router-dom";

const CommentSection = ({ articleId }) => {
  const [formData, setFormData] = useState({
    articleName: articleId,
    commentOwner: "",
    comment: ""
  });
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  
  const articleUrl = window.location.href;

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get_comments/${articleId}`);
        setComments(response.data.slice(0, 10)); // Get only first 10 comments
        setTotalComments(response.data.length); // Store total count
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [articleId]);

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

    try {
      const response = await axios.post(`${ApiUrl}/post_comment`, formData);
      
      // Update comments list if we have less than 10 comments
      if (comments.length < 10) {
        setComments(prev => [response.data, ...prev]);
      }
      setTotalComments(prev => prev + 1);

      alert(`Thank you, ${formData.commentOwner}! Your comment has been posted.`);

      setFormData({
        articleName: articleId,
        commentOwner: "",
        comment: "",
      });

      window.location.reload()
    } catch (error) {
      alert("Error posting comment. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "600px", margin: "auto", borderRadius: "10px" }}
      >
        {/* Comments Display */}
        {comments.length > 0 && (
          <div className="mb-4">
            <h5 className="mb-3 text-primary">
              <i className="bi bi-chat-quote me-2"></i> Recent Comments
            </h5>
            <div className="list-group">
              {comments.map((comment) => (
                <div key={comment._id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-1">{comment.commentOwner}</h6>
                    <small className="text-muted">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="mb-1">{comment.comment}</p>
                </div>
              ))}
            </div>
            {totalComments > 10 && (
              <div className="text-center mt-3">
                <Link 
                  to={`/post_cooments/${articleId}`} 
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="bi bi-eye me-1"></i>
                  View All {totalComments} Comments
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Comment Form */}
        <h5 className="mb-3 text-primary">
          <i className="bi bi-chat-dots me-2"></i> Make a Comment
        </h5>
        <h6 className="mb-3 text-primary" >
       <a href={`/post_cooments/${articleId}`}>  <i className="bi bi-chat-dots me-2"></i> See Comments </a>

         </h6>
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
