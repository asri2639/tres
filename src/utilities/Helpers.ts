const thumbnailKeys = [
  'small_3_2',
  'small_1_1',
  'small_2_1',
  'medium_3_2',
  'medium_2_1',
  'medium_1_1',
  'web_3_2',
  'web_2_1',
  'web_1_1',
  'high_3_2',
  'high_2_1',
  'high_1_1',
];

export const isEmpty = (obj) => {
  for (var i in obj) return false;
  return true;
};
export const thumbnailExtractor = (
  thumbnailObj,
  ratio = '3_2',
  extractionOrder = 's2b'
) => {
  const order = (extractionOrder === 's2b'
    ? thumbnailKeys
    : thumbnailKeys.reverse()
  ).filter((v) => v.endsWith(ratio));

  if (isEmpty(thumbnailObj)) {
    return { alt_tags: '', caption: '', url: '/assets/images/placeholder.png' };
  }

  for (var i of order) {
    if (thumbnailObj[i]) {
      return thumbnailObj[i];
    }
  }
  return { alt_tags: '', caption: '', url: '/assets/images/placeholder.png' };
};
