export const toTitleCase = (name: string) => {
  const [firstChar, ...rest] = name.split('');
  return [firstChar.toUpperCase(), ...rest].join('');
};

export default toTitleCase;
