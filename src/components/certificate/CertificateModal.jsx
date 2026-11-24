import { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Award, 
  Copy, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { downloadCertificatePdf } from '../../utils/certificateStorage';
import './CertificateModal.css';

const CertificateModal = ({ certificate, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!certificate) return null;

  const handleCopyId = () => {
    if (certificate.id) {
      navigator.clipboard.writeText(certificate.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    try {
      downloadCertificatePdf(certificate);
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cert-modal-overlay animate-slide-up" onClick={onClose}>
      <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div className="cert-modal-topbar">
          <div className="cert-topbar-title">
            <Award size={20} className="text-gold" />
            <span>Accredited Course Certificate</span>
          </div>
          <button className="cert-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Certificate Preview Body */}
        <div className="cert-preview-wrapper">
          <div className="certificate-canvas">
            <div className="certificate-inner-border">
              {/* Corner brackets */}
              <div className="cert-corner top-left"></div>
              <div className="cert-corner top-right"></div>
              <div className="cert-corner bottom-left"></div>
              <div className="cert-corner bottom-right"></div>

              {/* Header Branding */}
              <div className="cert-brand">
                <div className="cert-logo-icon">S</div>
                <span className="cert-academy-title">SkillForge Academy</span>
              </div>

              <div className="cert-category-tag">
                {certificate.category || 'Professional Development'}
              </div>

              <h1 className="cert-main-heading">Certificate of Completion</h1>

              <p className="cert-presented-text">This is proudly presented to</p>

              <h2 className="cert-recipient-name">{certificate.recipientName}</h2>
              <p className="cert-recipient-role">
                {certificate.recipientTitle} • {certificate.department}
              </p>

              <p className="cert-achievement-text">
                For successfully fulfilling all curriculum guidelines, assessments, and competency milestones for the accredited training course
              </p>

              <h3 className="cert-course-name">{certificate.courseTitle}</h3>

              {/* Certificate Metadata */}
              <div className="cert-meta-grid">
                <div className="cert-meta-item">
                  <span className="cert-meta-label">Completion Date</span>
                  <span className="cert-meta-val">{certificate.issueDate}</span>
                </div>
                <div className="cert-meta-item right">
                  <span className="cert-meta-label">Certificate ID</span>
                  <span className="cert-meta-val">{certificate.id}</span>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="cert-footer-grid">
                <div className="cert-signature-box">
                  <div className="cert-signature-line"></div>
                  <span className="cert-signer-name">{certificate.instructor || 'Dr. Elena Vance'}</span>
                  <span className="cert-signer-title">{certificate.instructorTitle || 'Head of Learning & Development'}</span>
                </div>

                <div className="cert-official-seal">
                  <ShieldCheck size={28} />
                  <span className="cert-seal-text">VERIFIED</span>
                </div>

                <div className="cert-signature-box">
                  <div className="cert-signature-line"></div>
                  <span className="cert-signer-name">{certificate.executiveOfficer || 'Marcus Sterling'}</span>
                  <span className="cert-signer-title">{certificate.executiveTitle || 'Chief Human Resources Officer'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="cert-modal-actions">
          <div className="cert-id-pill">
            <span>ID: {certificate.id}</span>
            <button 
              className="btn btn-secondary text-xs p-1" 
              onClick={handleCopyId}
              title="Copy Certificate ID"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="cert-actions-right">
            <button className="btn btn-secondary" onClick={handlePrint}>
              <Printer size={16} /> Print
            </button>

            <button 
              className="btn btn-primary" 
              onClick={handleDownload}
              disabled={downloading}
            >
              <Download size={16} /> {downloading ? 'Downloading...' : 'Download Certificate (PDF)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
