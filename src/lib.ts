import crypto from "crypto";

function Gerador() {
  const buffer = crypto.randomBytes(Math.ceil(6 / 2));
  return buffer.toString("hex").slice(0, 6).toUpperCase();
}

export { Gerador };
