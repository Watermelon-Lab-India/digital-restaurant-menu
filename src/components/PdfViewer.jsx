import React from 'react';

const PdfViewer = ({ pdfUrl, title }) => {
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>{title}</h2>
      <div style={{ width: '90%', height: 'calc(100vh - 100px)', border: '1px solid #ccc' }}>
        <iframe
          src={pdfUrl}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title={title}
        ></iframe>
      </div>
    </div>
  );
};

export default PdfViewer;