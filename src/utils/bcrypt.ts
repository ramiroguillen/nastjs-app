import * as bcrypt from 'bcrypt';

export const createHash = async (value: string) => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hashSync(value, salt);
};

export const verifyHash = (value: string, hash: string) => {
  return bcrypt.compareSync(value, hash);
};
