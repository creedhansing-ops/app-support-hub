import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Secret from '@site/src/components/Secret';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Add our custom component
  Secret,
};
