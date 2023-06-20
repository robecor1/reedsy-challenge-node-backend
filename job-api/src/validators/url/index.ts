// We use the URL object for a simple verification if the string is a valid URL
export const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
}