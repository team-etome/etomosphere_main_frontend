import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  if (loading) return <div style={{ padding: 24 }}>Loading…</div>;
  if (err || !emp) return <div style={{ padding: 24 }}>Error: {err}</div>;

  return (
    <div style={{ padding: 24, display: "grid", placeItems: "center" }}>
      <div
        style={{
          maxWidth: 560,
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: 20,
          background: "#fff",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {emp.photo_url ? (
            <img
              src={emp.photo_url}
              alt={emp.name}
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                borderRadius: 12,
                border: "1px solid #eee",
              }}
            />
          ) : (
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 12,
                border: "1px solid #eee",
                display: "grid",
                placeItems: "center",
                background: "#fafafa",
                fontSize: 42,
                fontWeight: 700,
                color: "#666",
              }}
            >
              {(emp.name || "?").slice(0, 1)}
            </div>
          )}

          <div>
            <h2 style={{ margin: "6px 0" }}>{emp.name}</h2>
            {emp.designation && (
              <div>
                <b>Designation:</b> {emp.designation}
              </div>
            )}
            {emp.region && (
              <div>
                <b>Region:</b> {emp.region}
              </div>
            )}
            {emp.phone && (
              <div>
                <b>Phone:</b>{" "}
                <a href={`tel:${emp.phone}`}>{emp.phone}</a>
              </div>
            )}
            <div>
              <b>Email:</b>{" "}
              <a href={`mailto:${emp.email}`}>{emp.email}</a>
            </div>
          </div>
        </div>

        {emp.qr_url && (
          <div style={{ marginTop: 16 }}>
            <img
              src={emp.qr_url}
              alt="QR Code"
              style={{
                width: 160,
                height: 160,
                border: "1px solid #eee",
                borderRadius: 8,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
