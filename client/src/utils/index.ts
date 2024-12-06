export const getCountry = async (ip: string) => {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const geo = await response.json();
    const country = geo.country || "Unknown";
    return country;
  } catch (err) {
    return "Unknown";
  }
};
