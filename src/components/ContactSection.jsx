import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        setLoading(false);
        setSubmitted(true);
      },
      (err) => {
        setLoading(false);
        setError("Failed to send message. Please try again later.");
        console.error("EmailJS Error:", err);
      },
    );
  };

  return (
    <div className="card bg-white border border-light-subtle shadow-sm rounded-4 p-4 p-md-5 my-4">
      <div className="row g-4 align-items-center">
        {/* Contact Information Column */}
        <div className="col-md-5">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-medium mb-2">
            <i className="bi bi-envelope-paper me-1"></i> Get In Touch
          </span>
          <h3 className="fw-bold text-dark">Let's Connect</h3>
          <p className="text-secondary small mb-4">
            Looking for a Full Stack Developer or have questions about my
            projects? Send me a message!
          </p>

          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="badge bg-primary rounded-circle p-3 d-inline-flex">
                <i className="bi bi-envelope text-white fs-5"></i>
              </div>
              <div>
                <span className="text-muted small d-block">Email</span>
                <a
                  href="mailto:voranzov@gmail.com"
                  className="fw-semibold text-dark text-decoration-none"
                >
                  voranzov@gmail.com
                </a>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="badge bg-primary rounded-circle p-3 d-inline-flex">
                <i className="bi bi-geo-alt text-white fs-5"></i>
              </div>
              <div>
                <span className="text-muted small d-block">Location</span>
                <span className="fw-semibold text-dark">
                  Toronto, ON, Canada
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* EmailJS Form Column */}
        <div className="col-md-7">
          {submitted ? (
            <div className="alert alert-success rounded-3 p-4 text-center mb-0">
              <i className="bi bi-check-circle-fill fs-2 d-block mb-2 text-success"></i>
              <h5 className="fw-bold">Message Sent!</h5>
              <p className="small mb-0">
                Thank you for reaching out. I'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-3 bg-light-subtle border border-light-subtle rounded-3"
            >
              {error && (
                <div className="alert alert-danger small p-2 mb-3">{error}</div>
              )}

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-dark">
                  Message
                </label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="3"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary fw-semibold rounded-3 w-100 py-2"
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-1"></i> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
