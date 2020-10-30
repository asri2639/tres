export const isEmpty = (obj) => {
  for (var i in obj) return false;
  return true;
};
export const thumbnailExtractor = (
  thumbnailObj,
  ratio = '3_2',
  extractionOrder = 's2b'
) => {
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

export const stateCodeConverter = (e) => {
  return {
    assam: 'assam',
    odisha: 'or',
    punjab: 'pb',
    rajasthan: 'rj',
    sikkim: 'sk',
    telangana: 'ts',
    'uttar-pradesh': 'up',
    'andhra-pradesh': 'ap',
    'arunachal-pradesh': 'ar',
    bihar: 'bh',
    chhattisgarh: 'ct',
    chandigarh: 'ch',
    delhi: 'dl',
    gujarat: 'gj',
    haryana: 'hr',
    'himachal-pradesh': 'hp',
    jharkhand: 'jh',
    karnataka: 'ka',
    'madhya-pradesh': 'mp',
    maharastra: 'mh',
    maharashtra: 'mh',
    manipur: 'mn',
    national: 'na'
  }[e.toLowerCase()];
};
