export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://dev-tinder-phi-nine.vercel.app"
    : "http://localhost:3000";
