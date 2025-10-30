export const getGoogleDriveDirectLink = (shareLink) => {
  if (!shareLink) return '';

  const regex = /file\/d\/([a-zA-Z0-9_-]+)/;
  const match = shareLink.match(regex);

  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  return shareLink; // Return original link if ID not found
};