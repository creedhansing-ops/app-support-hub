import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "General",
      items: [
        {
          type: "doc",
          id: "version-1.0/api-qdrant/hapus-data-qdrant",
          label: "Hapus Data Qdrant",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/api-qdrant/restore-snapshot",
          label: "Restore Snapshot",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
