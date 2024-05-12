export function lightenColor(hex: string | undefined, percent: number): string {
  if(!hex){
    return ''
  }
  // Remove the '#' from the beginning of the hex string
  hex = hex.replace(/^#/, '');

  // Convert the hex color to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the percent to lighten each RGB component
  const lightenAmount = Math.round(255 * (percent / 100));

  // Lighten the color
  const newR = Math.min(r + lightenAmount, 255);
  const newG = Math.min(g + lightenAmount, 255);
  const newB = Math.min(b + lightenAmount, 255);

  // Convert the new RGB values back to hexadecimal
  const newHex = '#' + [newR, newG, newB].map(component => {
    const hexValue = component.toString(16);
    return hexValue.length === 1 ? '0' + hexValue : hexValue;
  }).join('');

  return newHex;
}

export function copyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // To avoid scrolling to the textarea
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const success = document.execCommand('copy');
      if (!success) {
        reject(new Error('Failed to copy text to clipboard'));
      } else {
        resolve();
      }
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textarea);
    }
  });
}
