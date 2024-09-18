export const searchSubtitle = (vttContent, keyword) => {
  const keywordLower = keyword.toLowerCase();

  const subList = vttContent.split("\n\n");

  const results = {};

  subList.forEach((subBlock) => {
    const lines = subBlock.split("\n");
    const timestamp = lines[0];
    const text = lines.slice(1).join(" ");

    if (text.toLowerCase().includes(keywordLower)) {
      results[timestamp] = text;
    }
  });

  return results;
};
