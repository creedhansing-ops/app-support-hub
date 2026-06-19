import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "General",
      items: [
        {
          type: "doc",
          id: "version-1.0/api-tiktok/get-token",
          label: "Get Token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/api-tiktok/add-to-gateway",
          label: "Add To Gateway",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "version-1.0/api-tiktok/get-register-gateway-to-tik-tok",
          label: "Get Register Gateway to TikTok",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
