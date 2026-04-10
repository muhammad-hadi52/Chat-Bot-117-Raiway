import Chatbot from "./chatbot/ChatbotUI";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <>
      {/* ── Demo page (replace with your own page content) ── */}
      <div className="container py-5">
        <div className="text-center mt-5 pt-5">
          <h2 className="text-success fw-bold">Pakistan Railways</h2>
          <p className="text-muted">
            Your official travel companion. Click the chat button to get
            started.
          </p>
          <div
            className="mt-4 p-4 bg-white rounded-3 shadow-sm d-inline-block text-start"
            style={{ maxWidth: 500 }}
          >
            <h6 className="fw-bold">Sample queries you can ask</h6>
            <ul className="text-muted small mb-0">
              <li>Check refund policy for your e-ticket</li>
              <li>Know about train delays and cancellations</li>
              <li>Understand guard chart rules</li>
              <li>Get helpline numbers for Easypaisa issues</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Chatbot widget (floating, embeddable) ── */}
      <Chatbot />
    </>
  );
}
