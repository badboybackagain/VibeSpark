import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function IconRenderer({ name, className = 'w-5 h-5', ...props }) {
  // Normalize and look up icon
  const IconComponent = LucideIcons[name] || LucideIcons.Sparkles;
  return <IconComponent className={className} {...props} />;
}
