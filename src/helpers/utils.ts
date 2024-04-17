import fs from "fs";

let jwtPublicKey: string;
let jwtPrivateKey: string;

export const loadJwtPublicKey = (path: string): string => {
  if (jwtPublicKey) return jwtPublicKey;

  const key = fs.readFileSync(`${__dirname}/${path}`).toString(); //TODO: replace for non-blocking
  jwtPublicKey = key;

  return jwtPublicKey;
};

export const loadJwtPrivateKey = (path: string): string => {
  if (jwtPrivateKey) return jwtPrivateKey;

  const key = fs.readFileSync(`${__dirname}/${path}`).toString(); //TODO: replace for non-blocking
  jwtPrivateKey = key;

  return jwtPrivateKey;
};
