import { IProduct } from './types';

// Sækja slóð á API úr env
const baseurl:string | undefined = process.env.REACT_APP_API_URL;

function getPage(limit: Number, offset: Number) {
  return `${
    limit
    ? offset 
      ? `?limit=${limit}&offset=${offset}`
      : `?limit=${limit}`
    : offset
      ? `?offset=${offset}`
      : ''
  }`;
}

async function getProduct(id: number | string) {
  const path = `products/${id}`;

  const url = new URL(path, baseurl);
  const result = await fetch(url.href);
  return result.json();
}

async function getProducts(
  limit: Number, offset: Number, category: Number, search: String
) {
  const page = getPage(limit, offset);
  const isPage = `${page ? '&' : '?'}`
  const query = `${
    search 
    ? category
      ? `${isPage}search=${search}&category=${category}`
      : `${isPage}search=${search}`
    : category
      ? `${isPage}category=${category}`
      : ''
  }`;

  const path = `products/${page}${query}`;

  const url = new URL(path, baseurl);
  const result = await fetch(url.href);
  return result.json();
}

async function getCategories(
  limit: Number, offset: Number, category: Number
) {
  const id = `${category ? `/${category}` : ''}`;
  const page = getPage(limit, offset);

  const path = `categories/${id}${page}`;

  const url = new URL(path, baseurl);
  const result = await fetch(url.href);
  return result.json();
}

async function postLogin(username: String, password: String) {
  const path = 'users/login';
  const url = new URL(path, baseurl);

  const user = {
    username,
    password
  }

  const result = await fetch(url.href, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': "application/json",
    },
    body:JSON.stringify(user),
  });

  return result.json();
}

async function getCart(token: String, id: Number | undefined) {
  const path = typeof id === 'undefined' ? 'cart' : `cart/line/${id}`;
  const url = new URL(path, baseurl);
  const result = await fetch(url.href, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return result.json();  
}

export {
  getProduct,
  getProducts,
  getCategories,
  getCart,
  postLogin,
};
