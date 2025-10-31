import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './EmployeePublic.css';

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

  if (loading) return <div className="employee-loading">Loading…</div>;
  if (err || !emp) return <div className="employee-error">Error: {err}</div>;

  return (
    <div className="employee-container">
      <div className="employee-card">
        <div className="employee-header">
          {emp.photo_url ? (
            <img
              src={emp.photo_url}
              alt={emp.name}
              className="employee-photo"
            />
          ) : (
            <div className="employee-photo-placeholder">
              {(emp.name || "?").slice(0, 1)}
            </div>
          )}

          <div className="employee-info">
            <h2 className="employee-name">{emp.name}</h2>
            {emp.designation && (
              <div className="employee-detail">
                <b>Designation:</b> {emp.designation}
              </div>
            )}
            {emp.region && (
              <div className="employee-detail">
                <b>Region:</b> {emp.region}
              </div>
            )}
            {emp.phone && (
              <div className="employee-detail">
                <b>Phone:</b>{" "}
                <a href={`tel:${emp.phone}`}>{emp.phone}</a>
              </div>
            )}
            <div className="employee-detail">
              <b>Email:</b>{" "}
              <a href={`mailto:${emp.email}`}>{emp.email}</a>
            </div>
            {emp.address && (
              <div className="employee-detail">
                <b>Address:</b> {emp.address}
              </div>
            )}
          </div>
        </div>

        {emp.qr_url && (
          <div className="employee-qr">
            <img
              src={emp.qr_url}
              alt="QR Code"
              className="qr-code"
            />
          </div>
        )}
      </div>
    </div>
  );
}
