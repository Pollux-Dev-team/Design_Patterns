// function to take a string and number and return the first n letters of the string + '...'
export const nLetters = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n) + "..." : str;
};
