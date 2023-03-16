export const fetchWords = async () => {
  const validWords = await fetch(
    "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
  )
    .then((response) => response.text())
    .then((text) => text.split("\n").map((word) => word.trim()));
  return validWords;
};
