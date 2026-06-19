// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import fs from 'fs';
import path from 'path';

import yaml from 'js-yaml';
import p2o from 'postman-to-openapi';

export default async function createConfig() {
  // Dinamis membaca folder openapi/ untuk men-generate config OpenAPI Docs
  /** @type {Record<string, any>} */
  const openapiDocsConfig = {};
  /** @type {any[]} */
  const apiNavbarItems = [];
  try {
    const openapiDir = path.resolve(__dirname, 'openapi');
    const tempDir = path.resolve(__dirname, '.docusaurus', 'openapi-specs');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    if (fs.existsSync(openapiDir)) {
      const files = fs.readdirSync(openapiDir);
      for (const file of files) {
        if (file.endsWith('.yaml') || file.endsWith('.json') || file.endsWith('.md')) {
          let id = file.replace(/\.(yaml|json|md)$/, '');
          let docLabel = id.toUpperCase();
          const filePath = path.join(openapiDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          let targetContent = fileContent;

          // Ekstrak string body jika berasal dari Decap CMS
          try {
            /** @type {any} */
            const doc = yaml.load(fileContent);
            if (doc && typeof doc === 'object') {
              if (doc.title) {
                docLabel = doc.title;
                id = doc.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              }
              if (doc.spec_file) {
                 // The user uploaded a file, e.g. /img/QDRANT.postman_collection.json
                 const specFilePath = path.join(__dirname, 'static', doc.spec_file.replace(/^\//, ''));
                 if (fs.existsSync(specFilePath)) {
                    targetContent = fs.readFileSync(specFilePath, 'utf8');
                 }
              } else if (doc.body) {
                 targetContent = doc.body;
              }
            }
          } catch (e) {
            // Abaikan jika bukan format CMS yang valid
          }

          const tempInputPath = path.join(tempDir, `${id}-input.tmp`);
          const tempOutputPath = path.join(tempDir, `${id}.yaml`);
          fs.writeFileSync(tempInputPath, targetContent);

          // Auto-convert jika terdeteksi Postman Collection
          if (targetContent.includes('schema.getpostman.com') || targetContent.includes('_postman_id')) {
            try {
              // Ensure input is pure JSON, as p2o fails on YAML strings
              const parsedPostman = yaml.load(targetContent);
              
              // Filter out invalid items that don't have a URL to prevent p2o crash
              if (parsedPostman && Array.isArray(parsedPostman.item)) {
                const filterItems = (items) => {
                  return items.filter(item => {
                    if (item.item) {
                      item.item = filterItems(item.item);
                      return true; // Keep folders
                    }
                    if (item.request && item.request.body && item.request.body.raw) {
                      try {
                        // Strip single line comments inside raw JSON strings
                        item.request.body.raw = item.request.body.raw.replace(/(?:^|\s)\/\/.*$/gm, '');
                      } catch (e) {}
                    }
                    return item.request && item.request.url; // Must have URL
                  });
                };
                parsedPostman.item = filterItems(parsedPostman.item);
              }

              fs.writeFileSync(tempInputPath, JSON.stringify(parsedPostman, null, 2));
              await p2o(tempInputPath, tempOutputPath, { defaultTag: 'General' });
            } catch (e) {
              console.error(`Error converting postman file ${file}:`, e);
              continue;
            }
          } else {
            // Asumsikan ini sudah OpenAPI biasa
            fs.copyFileSync(tempInputPath, tempOutputPath);
          }

          openapiDocsConfig[id] = {
            specPath: `.docusaurus/openapi-specs/${id}.yaml`,
            outputDir: `versioned_docs/version-1.0/api-${id}`,
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "info",
            },
          };

          let infoTitle = id;
          try {
             /** @type {any} */
             const parsedApi = yaml.load(targetContent);
             if (parsedApi && parsedApi.info) {
               if (parsedApi.info.title) infoTitle = parsedApi.info.title;
               else if (parsedApi.info.name) infoTitle = parsedApi.info.name;
             }
          } catch(e) {}
          const infoSlug = infoTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

          let firstDocRoute = `/docs/api-${id}/${infoSlug}`;
          const sidebarPath = path.join(__dirname, `versioned_docs/version-1.0/api-${id}/sidebar.ts`);
          if (fs.existsSync(sidebarPath)) {
            const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
            // Parse id dari sidebar.ts untuk mendapatkan halaman pertama
            const match = sidebarContent.match(/id:\s*"version-1\.0\/(.*?)"/);
            if (match) {
               firstDocRoute = `/docs/${match[1]}`;
            }
          }

          apiNavbarItems.push({
            label: docLabel,
            to: firstDocRoute,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error processing openapi directory:", error);
  }

  /** @type {import('@docusaurus/types').Config} */
  const config = {
  title: 'SupportDocs Hub',
  tagline: 'Precision Internal Tooling',
  favicon: 'img/3dolphins-icon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://appsupp.docs.internal',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'application-support', // Usually your GitHub org/user name.
  projectName: 'appsupp-docs', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid', 'docusaurus-theme-openapi-docs'],

  plugins: [
    'docusaurus-plugin-sass',
    './plugins/tailwind-plugin.cjs',
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: openapiDocsConfig
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
      },
    ],
  ],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
      type: 'text/css',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=JetBrains+Mono:wght@400&family=Manrope:wght@600;700&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          docItemComponent: "@theme/ApiItem",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        logo: {
          alt: '3Dolphins Logo',
          src: 'img/3dolphins-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/docs/category/client-infrastructure', label: 'Client Infrastructure', position: 'left'},
          {to: '/docs/knowledge-base/channel-youtube', label: 'Knowledge Base', position: 'left'},
          ...(apiNavbarItems.length > 0 ? [{
            type: 'dropdown',
            label: 'API Docs',
            position: 'left',
            items: apiNavbarItems,
          }] : []),
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Knowledge Base',
                to: '/docs/knowledge-base/channel-youtube',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Internal Wiki',
                href: '#',
              },
              {
                label: 'Contact Support',
                href: '#',
              },
              {
                label: 'Security Policy',
                href: '#',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Application Support Team. Internal Use Only. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

  return config;
}
