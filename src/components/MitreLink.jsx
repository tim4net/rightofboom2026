import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * MitreLink - Renders a MITRE ATT&CK technique ID as a clickable hyperlink
 *
 * Usage:
 *   <MitreLink technique="T1003" />
 *   <MitreLink technique="T1003.001" />
 *   <MitreLink technique="T1003.001" showIcon />
 *
 * URL Conversion:
 *   T1003 → https://attack.mitre.org/techniques/T1003/
 *   T1003.001 → https://attack.mitre.org/techniques/T1003/001/
 */
const MitreLink = ({
  technique,
  className = '',
  showIcon = false,
  children
}) => {
  // Convert technique ID to MITRE ATT&CK URL
  // T1003.001 → /techniques/T1003/001/
  // T1003 → /techniques/T1003/
  const getMitreUrl = (techniqueId) => {
    if (!techniqueId) return null;

    // Handle sub-techniques (T1003.001 → T1003/001)
    const parts = techniqueId.split('.');
    const baseTechnique = parts[0];
    const subTechnique = parts[1];

    if (subTechnique) {
      return `https://attack.mitre.org/techniques/${baseTechnique}/${subTechnique}/`;
    }
    return `https://attack.mitre.org/techniques/${baseTechnique}/`;
  };

  const url = getMitreUrl(technique);

  if (!url) return <span className={className}>{technique || children}</span>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:underline cursor-pointer inline-flex items-center gap-1 ${className}`}
      title={`View ${technique} on MITRE ATT&CK`}
    >
      {children || technique}
      {showIcon && <ExternalLink className="w-3 h-3 opacity-60" />}
    </a>
  );
};

export default MitreLink;
