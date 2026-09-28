import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  RefreshCw, 
  Sparkles, 
  Trash2, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function Navbar({ 
  dbStatus, 
  onSeed, 
  onReset, 
  onOpenArchitecture, 
  onOpenViva,
  isOperating 
}) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const isConnected = dbStatus?.connected;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={24} />
          </div>
          <div className="brand-text">
            <h1>CloudGuard</h1>
            <div className="brand-subtitle">Data Redundancy Removal System • CodeAlpha Task 1</div>
          </div>
        </div>

        {/* Actions & Status */}
        <div className="nav-actions">
          {/* Cloud Database Connection Status */}
          <div 
            className={`cloud-pill ${isConnected ? 'online' : 'offline'}`}
            title={isConnected 
              ? `Connected to MongoDB Atlas: ${dbStatus?.database || 'cloudguard_db'}`
              : `Database Status: ${dbStatus?.error || 'Configure MONGODB_URI in backend/.env'}`
            }
          >
            <span className="status-dot"></span>
            <Database size={13} />
            <span>{isConnected ? 'MongoDB Atlas: Connected' : 'Cloud DB: Standby'}</span>
          </div>

          {/* Architecture & Task 1 Guide */}
          <button 
            className="btn btn-outline btn-sm"
            onClick={onOpenArchitecture}
            title="View CodeAlpha Task 1 Requirements & Architecture"
          >
            <Layers size={14} />
            <span>Architecture & Requirements</span>
          </button>

          {/* Viva Cheat Sheet */}
          <button 
            className="btn btn-outline btn-sm"
            onClick={onOpenViva}
            title="Viva & Interview Q&A"
          >
            <BookOpen size={14} />
            <span>Viva Guide</span>
          </button>

          {/* Seed Sample Records */}
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onSeed}
            disabled={isOperating}
            title="Seed baseline records and audit logs for demonstration"
          >
            <Sparkles size={14} />
            <span>Seed Demo Data</span>
          </button>

          {/* Reset Cloud DB */}
          {!showConfirmReset ? (
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setShowConfirmReset(true)}
              disabled={isOperating}
              title="Clear all records and audit history"
            >
              <Trash2 size={14} />
              <span>Reset</span>
            </button>
          ) : (
            <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
              <button 
                className="btn btn-danger btn-sm"
                onClick={() => {
                  setShowConfirmReset(false);
                  onReset();
                }}
                disabled={isOperating}
              >
                Confirm Clear
              </button>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => setShowConfirmReset(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
