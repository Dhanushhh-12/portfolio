import React, { useEffect } from 'react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <span className="modal-category">{project.category}</span>
            <h3>{project.title}</h3>
          </div>
          <button className="modal-close" onClick={onClose}>[ Close ]</button>
        </div>
        <div className="modal-body">
          <div className="modal-content-layout">
            <div className="modal-info-panel">
              <h4>Architectural Highlights</h4>
              <p>{project.desc}</p>
              <div className="modal-spec-grid">
                <div className="spec-card-item">
                  <span>My Role</span>
                  <p>{project.role}</p>
                </div>
                <div className="spec-card-item">
                  <span>Duration</span>
                  <p>{project.duration}</p>
                </div>
                <div className="spec-card-item">
                  <span>Technology Stack</span>
                  <p>{project.stack}</p>
                </div>
                <div className="spec-card-item">
                  <span>Performance Metric</span>
                  <p>{project.perf}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
