export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://dev-tinder-delta-ten.vercel.app"
    : "http://localhost:3000";
