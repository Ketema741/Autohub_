const generatedStrings = new Set();
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateUniqueRandomString(length) {
  while (true) {
    const randomString = generateRandomString(length);

    if (!generatedStrings.has(randomString)) {
      generatedStrings.add(randomString);
      return randomString;
    }
  }
}

function generateRandomString(length) {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = generateUniqueRandomString;
