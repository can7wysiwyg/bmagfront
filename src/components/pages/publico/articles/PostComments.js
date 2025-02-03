import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../../../helpers/ApiUrl';



const PostComments = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [showArticle, setShowArticle] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [commentOwner, setCommentOwner] = useState('');
  const [loading, setLoading] = useState(true);

  const articleUrl = window.location.href;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleRes, commentsRes] = await Promise.all([
          axios.get(`${ApiUrl}/articleroute/article_by_magazineissue/${id}`),
          axios.get(`${ApiUrl}/get_comments/${id}`)
        ]);

        console.log(articleRes)
        setArticle(articleRes.data.articleByIssue);
        setComments(commentsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);



  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment || !commentOwner) return;

    try {
      const response = await axios.post(`${ApiUrl}/post_comment`, {
        articleName: id,
        comment: newComment,
        commentOwner: commentOwner
      });

      setComments(prev => [...prev, response.data]);
      setNewComment('');
      setCommentOwner('');
      window.location.reload()
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Article Card */}
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="h4 mb-0">{article?.articleTitle}</h2>
              <button 
                className="btn btn-link"
                onClick={() => setShowArticle(!showArticle)}
              >
                {showArticle ? '▼' : '▲'}
              </button>
            </div>
            
            {showArticle && (
              <div className="card-body">
                <img
                  src={article?.articlePhoto}
                  alt={article?.articleTitle}
                  className="img-fluid rounded mb-3"
                />
                <p className="text-muted small">By {article?.articleAuthor}</p>
                <div dangerouslySetInnerHTML={{ __html: article?.articleContent }} />
              </div>
            )}
          </div>

          <div className='container' style={{marginBottom: 12, marginTop: 12}}>

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

<hr>
</hr>
          </div>

          {/* Comments Section */}
          <div className="card">
            <div className="card-header">
              <h3 className="h5 mb-0">Comments ({comments.length})</h3>
            </div>
            <div className="card-body">
              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-4">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={commentOwner}
                    onChange={(e) => setCommentOwner(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Post Comment
                </button>
              </form>

              {/* Comments List */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComments;