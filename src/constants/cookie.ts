export const cookieOptions = {
  path: "/",
  sameSite: "lax" as "lax",
  secure: true,
  domain: global.window?.location.hostname,
};
