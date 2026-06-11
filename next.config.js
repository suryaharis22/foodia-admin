/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [`api-foodia-staging.nuncorp.id`],
  },
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/ui-components/auth/login",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ui-components/auth/login",
        statusCode: 301,
      },
    ];
  },
};
