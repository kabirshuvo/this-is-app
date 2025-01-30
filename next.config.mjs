import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // Remove i18n and appDir configuration from here
};

export default withNextIntl(nextConfig);
