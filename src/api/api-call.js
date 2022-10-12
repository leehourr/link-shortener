import axios from "axios";

export const getLink = async (link) => {
  try {
    const linkFormatter = `https://api.shrtco.de/v2/shorten?url=${link}`;
    const res = await axios.get(linkFormatter, {
      headers: {
        Accept: "application/json",
      },
    });
    return res.data.result.full_short_link;
  } catch (e) {
    console.log(`${e} During fetching the Links`);
  }
};
