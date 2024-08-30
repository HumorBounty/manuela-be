import bcrypt from "bcrypt";

const hash = async ({ plainPassword }: { plainPassword: string }) => {
  return await bcrypt.hash(plainPassword, 10);
};

const compare = async (payloadPassword: string, dbPassword: string) => {
  return await bcrypt.compare(payloadPassword, dbPassword);
};

export { hash, compare };
