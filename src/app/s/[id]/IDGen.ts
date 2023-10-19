const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const generateRandomCharacter = (): string => {
  const randomIndex = Math.floor(Math.random() * ALPHABET.length);
  return ALPHABET[randomIndex];
};

const generateShortUniqueId = (length: number): string => {
  let id = '';
  for (let i = 0; i < length; i++) {
    id += generateRandomCharacter();
  }
  return id;
};

export default generateShortUniqueId;
