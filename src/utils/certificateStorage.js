const CERTIFICATES_STORAGE_KEY = 'skillforge_certificates';

/**
 * Generates a unique Certificate ID, e.g. SKF-CERT-2026-84920
 */
export function generateCertificateId(courseId = 'GEN') {
  const cleanId = String(courseId).toUpperCase().replace(/[^A-Z0-9]/g, '');
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `SKF-${cleanId}-${year}-${randomNum}`;
}

/**
 * Retrieve all certificates from localStorage
 */
export function getCertificates() {
  try {
    const raw = localStorage.getItem(CERTIFICATES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading certificates from localStorage:', err);
    return [];
  }
}

/**
 * Save a certificate to localStorage (appends or updates)
 */
export function saveCertificate(certificate) {
  try {
    const current = getCertificates();
    const existingIndex = current.findIndex(c => c.courseId === certificate.courseId);
    let updated;
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = { ...updated[existingIndex], ...certificate };
    } else {
      updated = [certificate, ...current];
    }
    localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving certificate to localStorage:', err);
    return [];
  }
}

/**
 * Find certificate for a specific course ID
 */
export function getCertificateByCourseId(courseId) {
  const all = getCertificates();
  return all.find(c => c.courseId === courseId) || null;
}

/**
 * Generate a new certificate for an employee who completed a course
 */
export function generateCertificateForCourse(course, user) {
  const existing = getCertificateByCourseId(course.id);
  if (existing) return existing;

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certificate = {
    id: generateCertificateId(course.id),
    courseId: course.id,
    courseTitle: course.title,
    category: course.category || 'General Learning',
    recipientName: user?.name || 'Alex Thorne',
    recipientTitle: user?.jobTitle || 'Team Member',
    department: user?.department || 'Product & Operations',
    issueDate,
    completedModules: course.totalModules || course.completedModules || 5,
    xpEarned: course.xpReward || 400,
    estimatedDuration: course.time || '2h',
    instructor: 'Dr. Elena Vance',
    instructorTitle: 'Head of Learning & Development',
    executiveOfficer: 'Marcus Sterling',
    executiveTitle: 'Chief Human Resources Officer',
  };

  saveCertificate(certificate);
  return certificate;
}

/**
 * Automatically creates default certificates for any courses that are already completed in initial state
 */
export function ensureDefaultCertificates(courses, user) {
  if (!Array.isArray(courses)) return [];
  const current = getCertificates();
  const completedCourses = courses.filter(c => c.status === 'completed' || c.progress === 100);

  let hasChanges = false;
  const list = [...current];

  completedCourses.forEach(course => {
    const exists = list.some(c => c.courseId === course.id);
    if (!exists) {
      const defaultDate = course.id === 'c2' ? 'January 28, 2026' : 'February 18, 2026';
      const cert = {
        id: generateCertificateId(course.id),
        courseId: course.id,
        courseTitle: course.title,
        category: course.category || 'Professional Development',
        recipientName: user?.name || 'Alex Thorne',
        recipientTitle: user?.jobTitle || 'Product Designer',
        department: user?.department || 'Product',
        issueDate: defaultDate,
        completedModules: course.totalModules || 5,
        xpEarned: course.xpReward || 400,
        estimatedDuration: course.time || '1h 30m',
        instructor: 'Dr. Elena Vance',
        instructorTitle: 'Head of Learning & Development',
        executiveOfficer: 'Marcus Sterling',
        executiveTitle: 'Chief Human Resources Officer',
      };
      list.push(cert);
      hasChanges = true;
    }
  });

  if (hasChanges) {
    localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(list));
  }

  return list;
}

/**
 * Pure frontend PDF generator: compiles a valid PDF 1.4 byte stream and triggers browser download
 */
export function downloadCertificatePdf(certificate) {
  const escapePdfText = (str) => (str || '').replace(/[\\()]/g, '\\$&');

  const safeName = escapePdfText(certificate.recipientName || 'Alex Thorne');
  const safeCourse = escapePdfText(certificate.courseTitle || 'SkillForge Course');
  const safeDate = escapePdfText(certificate.issueDate || 'November 2026');
  const safeId = escapePdfText(certificate.id || 'SKF-CERT-2026');
  const safeDept = escapePdfText(`${certificate.recipientTitle || 'Employee'} • ${certificate.department || 'SkillForge'}`);
  const safeCategory = escapePdfText((certificate.category || 'PROFESSIONAL TRAINING').toUpperCase());

  // PDF stream instructions (Landscape 792 x 612 pt)
  const streamContent = [
    'q',
    // Navy blue background
    '0.043 0.059 0.098 rg',
    '0 0 792 612 re f',
    // Outer metallic gold border
    '0.96 0.62 0.07 RG',
    '4 w',
    '24 24 744 564 re S',
    // Inner indigo accent border
    '0.39 0.40 0.94 RG',
    '1.5 w',
    '34 34 724 544 re S',
    // Corner accent brackets (top-left, top-right, bottom-left, bottom-right)
    '0.96 0.62 0.07 RG',
    '2 w',
    '40 540 m 40 566 l 66 566 l S',
    '726 566 m 752 566 l 752 540 l S',
    '40 72 m 40 46 l 66 46 l S',
    '726 46 m 752 46 l 752 72 l S',
    // Header Institution
    'BT',
    '/F1 15 Tf',
    '0.13 0.83 0.93 rg',
    '295 528 Td',
    '(SKILLFORGE ACADEMY) Tj',
    'ET',
    // Sub-header category
    'BT',
    '/F2 10 Tf',
    '0.58 0.64 0.72 rg',
    '315 508 Td',
    `(${safeCategory}) Tj`,
    'ET',
    // Main Title: CERTIFICATE OF COMPLETION
    'BT',
    '/F1 28 Tf',
    '0.97 0.98 0.99 rg',
    '180 460 Td',
    '(CERTIFICATE OF COMPLETION) Tj',
    'ET',
    // Presentation statement
    'BT',
    '/F2 13 Tf',
    '0.58 0.64 0.72 rg',
    '285 418 Td',
    '(THIS IS PROUDLY PRESENTED TO) Tj',
    'ET',
    // Recipient Full Name (Gold)
    'BT',
    '/F1 26 Tf',
    '0.96 0.62 0.07 rg',
    '250 365 Td',
    `(${safeName}) Tj`,
    'ET',
    // Recipient Role / Department
    'BT',
    '/F2 11 Tf',
    '0.58 0.64 0.72 rg',
    '270 342 Td',
    `(${safeDept}) Tj`,
    'ET',
    // Description text
    'BT',
    '/F2 13 Tf',
    '0.58 0.64 0.72 rg',
    '210 300 Td',
    '(for successfully completing all curriculum requirements for) Tj',
    'ET',
    // Course Title (White Bold)
    'BT',
    '/F1 22 Tf',
    '0.97 0.98 0.99 rg',
    '200 260 Td',
    `(${safeCourse}) Tj`,
    'ET',
    // Center divider
    '0.18 0.23 0.35 RG',
    '1 w',
    '100 215 m 692 215 l S',
    // Date & Certificate ID
    'BT',
    '/F2 11 Tf',
    '0.58 0.64 0.72 rg',
    '100 175 Td',
    `Date of Completion: ${safeDate}`,
    'ET',
    'BT',
    '/F2 11 Tf',
    '0.58 0.64 0.72 rg',
    '460 175 Td',
    `Certificate ID: ${safeId}`,
    'ET',
    // Signatures
    '0.58 0.64 0.72 RG',
    '1 w',
    '100 135 m 280 135 l S',
    '460 135 m 640 135 l S',
    'BT',
    '/F1 12 Tf',
    '0.97 0.98 0.99 rg',
    '100 115 Td',
    '(Dr. Elena Vance) Tj',
    'ET',
    'BT',
    '/F2 9 Tf',
    '0.58 0.64 0.72 rg',
    '100 100 Td',
    '(Head of Learning & Development) Tj',
    'ET',
    'BT',
    '/F1 12 Tf',
    '0.97 0.98 0.99 rg',
    '460 115 Td',
    '(Marcus Sterling) Tj',
    'ET',
    'BT',
    '/F2 9 Tf',
    '0.58 0.64 0.72 rg',
    '460 100 Td',
    '(Chief Human Resources Officer) Tj',
    'ET',
    // Official Seal text
    'BT',
    '/F1 11 Tf',
    '0.96 0.62 0.07 rg',
    '335 125 Td',
    '(OFFICIAL ACCREDITATION) Tj',
    'ET',
    'BT',
    '/F2 9 Tf',
    '0.13 0.83 0.93 rg',
    '348 108 Td',
    '(SKILLFORGE VERIFIED) Tj',
    'ET',
    'Q'
  ].join('\n');

  // Convert to utf-8 string
  const encoder = new TextEncoder();
  const streamBytes = encoder.encode(streamContent);
  const streamLength = streamBytes.length;

  const objects = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj');
  objects.push('3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 792 612] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj');
  objects.push(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`);
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj');
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj');

  let pdfText = '%PDF-1.4\n';
  const offsets = [];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(encoder.encode(pdfText).length);
    pdfText += objects[i] + '\n';
  }

  const startXref = encoder.encode(pdfText).length;
  pdfText += 'xref\n';
  pdfText += `0 ${objects.length + 1}\n`;
  pdfText += '0000000000 65535 f \n';
  for (let i = 0; i < offsets.length; i++) {
    const offsetStr = String(offsets[i]).padStart(10, '0');
    pdfText += `${offsetStr} 00000 n \n`;
  }

  pdfText += 'trailer\n';
  pdfText += `<< /Size ${objects.length + 1} /Root 1 0 R >>\n`;
  pdfText += 'startxref\n';
  pdfText += `${startXref}\n`;
  pdfText += '%%EOF\n';

  const fullPdfBytes = encoder.encode(pdfText);
  const blob = new Blob([fullPdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const cleanCourseName = (certificate.courseTitle || 'SkillForge-Course')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .toLowerCase();
  const filename = `Certificate-${cleanCourseName}-${certificate.id || 'SKF'}.pdf`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
