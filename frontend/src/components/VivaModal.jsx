import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const VIVA_QUESTIONS = [
  {
    q: 'What is Data Redundancy and why is it harmful in cloud environments?',
    a: 'Data redundancy occurs when identical or substantially equivalent information is stored multiple times across database instances. In cloud environments like MongoDB Atlas, redundancy inflates cloud storage costs, degrades query indexing performance, leads to data inconsistency across microservices, and skews analytics reporting.'
  },
  {
    q: 'How does CloudGuard prevent exact duplicate records from entering MongoDB Atlas?',
    a: 'CloudGuard uses deterministic data hashing. Input values (Name, Email, Phone) are canonicalized (lowercased, spaces collapsed, phone digits stripped) and hashed via SHA-256 into a 64-character dataHash. The cloud database indexes this field, enabling O(1) indexed lookups to reject exact duplicates instantly before any write occurs.'
  },
  {
    q: 'What is a False Positive in duplicate detection, and how does CloudGuard handle it?',
    a: 'A false positive occurs when two completely different individuals share the same full name (e.g., two people named "John Doe" or "Dr. Sarah Connor"). A naive system would flag the second person as a duplicate and reject them. CloudGuard examines primary unique credentials (email and phone). If the credentials differ, CloudGuard classifies the submission as FALSE_POSITIVE, acknowledges the name match, and safely appends the unique entry to MongoDB Atlas.'
  },
  {
    q: 'Why must validation and deduplication occur on the backend rather than only the frontend?',
    a: 'Frontend validation is purely a user convenience layer and can be bypassed using tools like Postman, curl, or automated scripts. The Express backend serves as the authoritative boundary, ensuring every record is rigorously validated, sanitized, and evaluated against database constraints regardless of the submission client.'
  },
  {
    q: 'How does CloudGuard ensure database search efficiency without scanning every record?',
    a: 'Rather than comparing incoming records against all database documents (O(N) full table scan), CloudGuard queries MongoDB using targeted indexes (normalizedEmail, normalizedPhone, contactHash, dataHash). Only a refined candidate pool is passed to the fuzzy similarity algorithms, ensuring sub-10ms response times even at scale.'
  },
  {
    q: 'How does CloudGuard connect securely to MongoDB Atlas in the cloud?',
    a: 'CloudGuard connects via the standard MongoDB driver over TLS using the MONGODB_URI environment variable. No credentials or passwords are hardcoded in the codebase, and sensitive files (.env) are excluded via .gitignore. The connection pool dynamically handles automatic reconnection and network drops.'
  }
];

export default function VivaModal({ isOpen, onClose }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-icon" style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                Viva Preparation & Technical Questions
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Comprehensive Q&A for CodeAlpha Internship Viva & Examiner Evaluation
              </p>
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {VIVA_QUESTIONS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.15rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isOpen ? 'rgba(30, 41, 59, 0.8)' : 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HelpCircle size={16} color="var(--accent-cyan)" />
                      <span>{item.q}</span>
                    </div>
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '1rem 1.15rem', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, borderTop: '1px solid var(--border-subtle)' }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close Viva Guide
          </button>
        </div>
      </div>
    </div>
  );
}
