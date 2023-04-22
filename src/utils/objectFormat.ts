export const objectToFormData = (obj: any) => {
  const formData = new FormData();
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((value: any, index: any) => formData.append(`${key}[${index}]`, value));
    } else {
      if (obj[key] === 'null') {
        formData.append(key, '');
      } else if (obj[key] !== null && obj[key] !== undefined) {
        formData.append(key, obj[key]);
      }
    }
  }
  return formData;
};

export const objectToJsonData = (obj: any) => {
  const data = Object.assign({}, obj);
  for (const key in data) {
    if (data[key] === 'null') {
      data[key] = null;
    }
  }
  return data;
};
