export default function FieldRow({ label, required, children, error }) {
  return (
    <div className="sr-field">
      <label className="sr-label">{label}{required && <span className="sr-req">*</span>}</label>
      {children}
      {error && <span className="sr-error">{error}</span>}
    </div>
  );
}
