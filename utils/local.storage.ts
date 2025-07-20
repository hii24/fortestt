export const getLocalStoreItem = (name: string) => {
  if (typeof window !== 'undefined') {
    const ls = localStorage.getItem(name);
    if (!ls) return null;

    try {
      return JSON.parse(ls);
    } catch {
      return null;
    }
  }
  return null;
};
