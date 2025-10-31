import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import './EmployeePublic.css';

const API_BASE = import.meta.env.VITE_API_BASE || "https://api.etomosphere.com";

export default function EmployeePublic() {
  const { slug } = useParams();
  const [emp, setEmp] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErr("");
    fetch(`${API_BASE}/api/employees/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Employee not found");
        return r.json();
      })
      .then((data) => {
        setEmp(data);
        // show one-time prompt (per browser)
        const key = `emp_prompt_dismissed_${data.slug}`;
        if (!localStorage.getItem(key)) setShowSavePrompt(true);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const dismissPrompt = () => {
    if (emp?.slug) {
      localStorage.setItem(`emp_prompt_dismissed_${emp.slug}`, "1");
    }
    setShowSavePrompt(false);
  };

  // Build a vCard 3.0 string from the employee data
  const vcardText = useMemo(() => {
    if (!emp) return "";
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${emp.name || ""}`,
      emp.designation ? `TITLE:${emp.designation}` : "",
      emp.region ? `ORG:${emp.region}` : "",                 // or department/org if you add it later
      emp.phone ? `TEL;TYPE=CELL:${emp.phone}` : "",
      emp.email ? `EMAIL;TYPE=INTERNET:${emp.email}` : "",
      emp.address ? `ADR;TYPE=HOME:;;${emp.address.replace(/\n/g, "\\n")};;;;` : "",
      emp.profile_url ? `URL:${emp.profile_url}` : "",
      "END:VCARD",
    ].filter(Boolean);
    return lines.join("\n");
  }, [emp]);

  // Trigger a .vcf download
  const saveContact = () => {
    if (!vcardText) return;
    const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const safeName = (emp?.name || "contact").replace(/[^\w\-]+/g, "_");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    dismissPrompt();
  };

  if (loading) return <div className="employee-loading">Loading…</div>;
  if (err || !emp) return <div className="employee-error">Error: {err}</div>;

  return (
    <div className="employee-container">
      {/* Save Contact banner */}
      {showSavePrompt && (
        <div className="save-banner" role="dialog" aria-live="polite">
          <div className="save-banner__content">
            <span>Save <b>{emp.name}</b> to your contacts?</span>
            <div className="save-banner__actions">
              <button className="btn btn-primary" onClick={saveContact}>Save Contact</button>
              <button className="btn btn-ghost" onClick={dismissPrompt} aria-label="Dismiss">Not now</button>
            </div>
          </div>
        </div>
      )}

      <div className="employee-card">
        <div className="employee-header">
          {emp.photo_url ? (
            <img
              src={emp.photo_url}
              alt={emp.name}
              className="employee-photo"
              loading="lazy"
              decoding="async"
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
                <b>Address:</b>{" "}
                <span style={{ whiteSpace: "pre-line" }}>{emp.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* If you want to show the QR too, uncomment */}
        {/* {emp.qr_url && (
          <div className="employee-qr">
            <img src={emp.qr_url} alt="QR Code" className="qr-code" loading="lazy" decoding="async" />
          </div>
        )} */}
      </div>
    </div>
  );
}
