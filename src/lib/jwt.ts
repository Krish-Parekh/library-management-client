export function getExpiryFromToken(token?: string): Date {
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return new Date(payload.exp * 1000);
  }
  throw new Error("No token provided");
}
