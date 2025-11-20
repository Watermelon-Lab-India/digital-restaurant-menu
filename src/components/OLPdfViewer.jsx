import React from "react";

const OLPdfViewer = ({ pdfUrl, title }) => {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#f5f5f5" }}>
      <h2 style={{ textAlign: "center", padding: "15px 0" }}>{title}</h2>

      <iframe
        src={pdfUrl}
        title={title}
        style={{
          width: "100%",
          height: "90vh",
          border: "none"
        }}
      ></iframe>
    </div>
  );
};

export default OLPdfViewer;
