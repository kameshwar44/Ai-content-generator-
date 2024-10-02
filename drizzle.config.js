/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:HWM4eY9gukAD@ep-damp-math-a5g7s398.us-east-2.aws.neon.tech/AI-content-generator?sslmode=require',
  }
};