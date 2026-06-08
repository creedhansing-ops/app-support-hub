import React from 'react';
import Content from '@theme-original/DocItem/Content';

export default function ContentWrapper(props) {
  return (
    <>
      <div className="theme-edit-this-page" style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}>
        <button 
          onClick={() => window.print()}
          className="button button--primary button--sm"
          style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', backgroundColor: 'var(--ifm-color-primary)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px'}}
        >
          <span className="material-symbols-outlined" style={{fontSize: '18px'}}>print</span>
          Export to PDF
        </button>
      </div>
      <Content {...props} />
    </>
  );
}
