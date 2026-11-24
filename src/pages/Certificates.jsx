import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Download, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Sparkles, 
  BookOpen, 
  User 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { 
  getCertificates, 
  ensureDefaultCertificates, 
  downloadCertificatePdf 
} from '../utils/certificateStorage';
import CertificateModal from '../components/certificate/CertificateModal';
import './Certificates.css';

const Certificates = () => {
  const { state } = useAppContext();
  const [certificates] = useState(() => {
    const certList = ensureDefaultCertificates(state.courses, state.user);
    return certList.length ? certList : getCertificates();
  });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleOpenCertificate = (cert) => {
    setSelectedCertificate(cert);
  };

  const handleCloseCertificate = () => {
    setSelectedCertificate(null);
  };

  const handleDownload = (e, cert) => {
    e.stopPropagation();
    downloadCertificatePdf(cert);
  };

  return (
    <div className="certificates-page animate-slide-up">
      {/* Top Banner */}
      <div className="certificates-hero">
        <div className="cert-hero-content">
          <div className="cert-hero-badge">
            <Sparkles size={14} /> Official Credentials
          </div>
          <h1 className="cert-hero-title">My Certificates</h1>
          <p className="cert-hero-desc">
            View, verify, and download your accredited training certificates. Each certificate includes an authentic verification ID and corporate accreditation seal.
          </p>
        </div>

        <div className="cert-hero-stats">
          <div className="cert-stat-badge">
            <span className="cert-stat-num text-gold">{certificates.length}</span>
            <span className="cert-stat-label">Certificates</span>
          </div>
          <div className="cert-stat-badge">
            <span className="cert-stat-num text-green-400">100%</span>
            <span className="cert-stat-label">Verified</span>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      {certificates.length === 0 ? (
        <div className="empty-cert-card">
          <div className="empty-cert-icon">
            <Award size={36} />
          </div>
          <h2 className="text-xl font-bold mb-2">No Certificates Earned Yet</h2>
          <p className="text-muted text-sm max-w-md mb-6">
            Complete your enrolled courses in My Learning to earn official course completion certificates recognized by SkillForge HR.
          </p>
          <Link to="/learning" className="btn btn-primary">
            <BookOpen size={16} /> Explore Courses
          </Link>
        </div>
      ) : (
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="cert-card card-hover">
              <div className="cert-card-header">
                <div className="cert-icon-container">
                  <Award size={26} />
                </div>
                <div className="cert-status-tag">
                  <CheckCircle2 size={13} /> Accredited
                </div>
              </div>

              <div className="cert-card-body">
                <span className="cert-course-category">{cert.category}</span>
                <h3 className="cert-card-title">{cert.courseTitle}</h3>

                <div className="cert-card-recipient">
                  <User size={15} className="text-muted" />
                  <span>Awarded to: <strong>{cert.recipientName}</strong></span>
                </div>

                <div className="cert-details-box">
                  <div className="cert-detail-row">
                    <span className="cert-detail-label">
                      <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      Issued Date:
                    </span>
                    <span className="cert-detail-value">{cert.issueDate}</span>
                  </div>

                  <div className="cert-detail-row">
                    <span className="cert-detail-label">
                      <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      Duration:
                    </span>
                    <span className="cert-detail-value">{cert.estimatedDuration}</span>
                  </div>

                  <div className="cert-detail-row">
                    <span className="cert-detail-label">Certificate ID:</span>
                    <span className="cert-detail-value id-font">{cert.id}</span>
                  </div>
                </div>

                <div className="cert-card-actions">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleOpenCertificate(cert)}
                  >
                    <Eye size={15} /> View
                  </button>

                  <button 
                    className="btn btn-primary"
                    onClick={(e) => handleDownload(e, cert)}
                  >
                    <Download size={15} /> Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={handleCloseCertificate}
        />
      )}
    </div>
  );
};

export default Certificates;
