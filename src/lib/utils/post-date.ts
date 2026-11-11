export const parsePostDate = (value?: string): Date | null => {
  if (!value) {
    return null;
  }

  const candidates = [
    value,
    value.replace(" ", "T"),
    value.replace(/\s\+0000$/, "Z").replace(" ", "T")
  ];

  for (const candidate of candidates) {
    const parsed = new Date(candidate);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  return null;
};
