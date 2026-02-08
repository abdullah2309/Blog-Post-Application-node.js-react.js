import React from "react";
import { useNavigate } from "react-router-dom";

const BlogList = ({ blogs, fetchBlogs, setEditBlog }) => {
  const navigate = useNavigate();

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await fetch(`http://localhost:5000/api/blogs/delete/${id}`, { method: "DELETE" });
      fetchBlogs();
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-dark">All Blog Posts</h5>
        <button className="btn btn-primary btn-sm" onClick={() => navigate("/create")}>
          <i className="bi bi-plus-lg me-1"></i> New Post
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-4">Preview</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created At</th>
              <th className="text-end pe-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="ps-4">
                  {blog.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${blog.image}`}
                      alt=""
                      className="rounded-3 shadow-sm"
                      style={{ width: "60px", height: "40px", objectFit: "cover" }}
                    />
                  ) : (
                    <div className="bg-light rounded-3 text-center" style={{ width: "60px", height: "40px", lineHeight: "40px" }}>
                      <i className="bi bi-image text-muted"></i>
                    </div>
                  )}
                </td>
                <td>
                  <div className="fw-bold text-dark">{blog.title}</div>
                  <small className="text-muted">{blog.subtitle?.substring(0, 30)}...</small>
                </td>
                <td>
                  <span className="badge bg-success bg-opacity-10 text-light rounded-pill px-3">Published</span>
                </td>
                <td>
                  <div className="small text-muted">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </td>
                <td className="text-end pe-4">
                  <button
                    className="btn btn-light btn-sm border me-2"
                    onClick={() => {
                      setEditBlog(blog);
                      navigate(`/edit/${blog._id}`);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => deleteBlog(blog._id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;