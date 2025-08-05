export const copyToClipboard = async (value: string) => {
  if (typeof value !== 'string') return;

  console.log('valued to be copied===', value);

  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    console.error('Not in browser environment');
    throw new Error('Not in browser environment');
  }

  // Try modern Clipboard API first
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true; // Success
    } catch (err) {
      console.error('Modern Clipboard API failed:', err);
      // Continue to fallback method
    }
  }

  // Fallback for older browsers or when modern API fails
  try {
    const textArea = document.createElement('textarea');
    textArea.value = value;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      console.log('Copied using fallback method');
      return true;
    } else {
      throw new Error('Fallback copy method failed');
    }
  } catch (fallbackErr) {
    console.error('Fallback copy method failed:', fallbackErr);
    throw new Error('Copy to clipboard failed');
  }
};
