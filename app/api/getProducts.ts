const url =
  'https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json';

export const getProducts = async () => {
  try {
    const res = await fetch(url, {
      method: 'GET',
    });
    return res.json();
  } catch (error) {
    return null;
  }
};
