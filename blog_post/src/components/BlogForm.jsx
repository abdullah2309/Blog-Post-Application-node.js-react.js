import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BlogForm = ({ fetchBlogs, editBlog, setEditBlog }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id && editBlog) {
      setTitle(editBlog.title);
      setSubtitle(editBlog.subtitle);
      setDescription(editBlog.description);
    }
  }, [id, editBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("description", description);
    if (image) formData.append("image", image);

    const url = id ? `http://localhost:5000/api/blogs/update/${id}` : "http://localhost:5000/api/blogs/create";
    const method = id ? "PUT" : "POST";

    await fetch(url, { method, body: formData });
    fetchBlogs();
    setEditBlog(null);
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-dark">{id ? "Edit Post" : "Compose New Post"}</h3>
          <button className="btn btn-link text-decoration-none text-muted" onClick={() => navigate("/")}>
            <i className="bi bi-x-lg"></i> Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Left Column: Content */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-4">
                <div className="mb-4">
                  <label className="form-label fw-bold">Post Title</label>
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light border-0 shadow-none"
                    placeholder="Enter title here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Subtitle / Excerpt</label>
                  <input
                    type="text"
                    className="form-control bg-light border-0 shadow-none"
                    placeholder="Brief summary of the post"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </div>

                <div className="mb-0">
                  <label className="form-label fw-bold">Content</label>
                  <textarea
                    className="form-control bg-light border-0 shadow-none"
                    rows="12"
                    placeholder="Start writing your story..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Column: Meta & Media */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h6 className="fw-bold mb-3">Featured Image</h6>
                <div 
                  className="border border-2 border-dashed rounded-4 p-4 text-center mb-3 bg-light position-relative"
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-cloud-arrow-up fs-1 text-primary"></i>
                  <p className="small text-muted mt-2">Click to upload or drag & drop</p>
                  <input
                    type="file"
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                {image && <p className="small text-success fw-bold text-center mt-2">✓ {image.name}</p>}
              </div>

              <div className="card border-0 shadow-sm rounded-4 p-4">
                <h6 className="fw-bold mb-3">Publishing Options</h6>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary btn-lg shadow-sm">
                    {id ? "Update Changes" : "Publish Now"}
                  </button>
                  <button type="button" className="btn btn-outline-secondary">
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;