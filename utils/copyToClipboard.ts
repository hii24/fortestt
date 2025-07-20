export const copyToClipboard = async (value: string) => {
  if (typeof value !== 'string') return;

  console.log('valued to be copied===', value);

  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    console.error('Failed to copy!', err);
  }
};
