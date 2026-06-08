import React, { useState } from 'react';

export default function Secret({ children }) {
  const [revealed, setRevealed] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(children.toString());
    alert('Copied to clipboard!');
  };

  return (
    <span 
      className={`inline-flex items-center gap-2 px-2 py-0.5 rounded cursor-pointer transition-colors ${revealed ? 'bg-surface-variant text-on-surface' : 'bg-surface-container-high text-on-surface-variant blur-[4px] hover:blur-[2px]'}`}
      onClick={() => setRevealed(!revealed)}
      title="Click to reveal"
      style={{ userSelect: revealed ? 'auto' : 'none' }}
    >
      <span className="font-code-block text-code-block">{revealed ? children : '••••••••••••'}</span>
      {revealed && (
        <span 
          className="material-symbols-outlined text-[14px] hover:text-primary" 
          onClick={handleCopy}
          title="Copy"
        >
          content_copy
        </span>
      )}
    </span>
  );
}
