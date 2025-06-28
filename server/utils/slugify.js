export const generateSlug = (title) => {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 60); // truncate long titles
  const unique = Date.now().toString(36); // short, unique suffix
  return `${base}-${unique}`;
};
