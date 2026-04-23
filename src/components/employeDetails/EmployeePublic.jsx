import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EmployeePublic.css";

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.etomosphere.com";

export default function EmployeePublic() {
  const { slug } = useParams();
  const [emp, setEmp] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setErr("");
    fetch(`${API_BASE}/api/employees/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Employee not found");
        return r.json();
      })
      .then(setEmp)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="employee-loading">
        <div className="loading-pulse" />
      </div>
    );

  if (err || !emp)
    return (
      <div className="employee-error">
        <h3>Profile not found</h3>
        <p>{err || "This employee profile does not exist."}</p>
      </div>
    );

  const initials = (emp.name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const vcfLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${emp.name}`,
    `N:${emp.name.split(" ").reverse().join(";")};;;`,
    "ORG:Etome Works LTD",
    emp.designation ? `TITLE:${emp.designation}` : "",
    emp.phone       ? `TEL;TYPE=CELL:${emp.phone}` : "",
    emp.email       ? `EMAIL:${emp.email}` : "",
    emp.address     ? `ADR;TYPE=WORK:;;${emp.address.replace(/\n/g, " ")};;;;` : "",
    emp.photo_url   ? `PHOTO;VALUE=URI:${emp.photo_url}` : "",
    "URL:https://etomosphere.com",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");

  const vcfHref = URL.createObjectURL(
    new Blob([vcfLines], { type: "text/vcard" })
  );

  return (
    <div className="employee-container">
      <div className="employee-card">

        {/* ── Banner ── */}
        <div className="employee-banner">
          <span className="employee-banner-company">
            <span className="employee-banner-dot" />
            Etome Works LTD
          </span>
        </div>

        {/* ── Avatar ── */}
        <div className="employee-avatar-wrap">
          {emp.photo_url ? (
            <img
              src={emp.photo_url}
              alt={emp.name}
              className="employee-photo"
            />
          ) : (
            <div className="employee-photo-placeholder">{initials}</div>
          )}
        </div>

        {/* ── Identity ── */}
        <div className="employee-identity">
          <h1 className="employee-name">{emp.name}</h1>
          {emp.designation && (
            <span className="employee-designation">{emp.designation}</span>
          )}
        </div>

        <div className="employee-divider" />

        {/* ── Contact details ── */}
        <ul className="employee-contact-list">
          {emp.phone && (
            <li className="employee-contact-item">
              <div className="ec-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19 19.45 19.45 0 0 1 5 12.18 19.79 19.79 0 0 1 2.08 4.2 2 2 0 0 1 4.07 2H7.1a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="ec-text">
                <span className="ec-label">Phone</span>
                <span className="ec-value">
                  <a href={`tel:${emp.phone}`}>{emp.phone}</a>
                </span>
              </div>
            </li>
          )}

          {emp.email && (
            <li className="employee-contact-item">
              <div className="ec-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="ec-text">
                <span className="ec-label">Email</span>
                <span className="ec-value">
                  <a href={`mailto:${emp.email}`}>{emp.email}</a>
                </span>
              </div>
            </li>
          )}

          {emp.region && (
            <li className="employee-contact-item">
              <div className="ec-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="ec-text">
                <span className="ec-label">Region</span>
                <span className="ec-value">{emp.region}</span>
              </div>
            </li>
          )}

          {emp.address && (
            <li className="employee-contact-item">
              <div className="ec-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="ec-text">
                <span className="ec-label">Address</span>
                <span className="ec-value">{emp.address}</span>
              </div>
            </li>
          )}
        </ul>

        {/* ── Action buttons ── */}
        <div className="employee-actions">
          <a
            className="emp-btn emp-btn-save"
            href={vcfHref}
            download={`${(emp.name || "contact").replace(/\s+/g, "_")}.vcf`}
          >
            <svg viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Save Contact
          </a>

          {emp.phone && (
            <a className="emp-btn emp-btn-call" href={`tel:${emp.phone}`}>
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19 19.45 19.45 0 0 1 5 12.18 19.79 19.79 0 0 1 2.08 4.2 2 2 0 0 1 4.07 2H7.1a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call
            </a>
          )}

          {emp.email && (
            <a className="emp-btn emp-btn-email" href={`mailto:${emp.email}`}>
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </a>
          )}
        </div>

        <p className="employee-footer">etomosphere.com</p>
      </div>
    </div>
  );
}