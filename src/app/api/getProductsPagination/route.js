import axios, { isCancel, AxiosError } from 'axios';
import { NextResponse } from 'next/server';
export default async function GET(offset, limit) {
  const productsPageUrl =
    'https://api.escuelajs.co/api/v1/products?offset=' +
    offset +
    '&limit=' +
    limit;
  const url = 'https://corsproxy.io/?' + encodeURIComponent(productsPageUrl);

  try {
    const response = await axios.get(url);
    const products = response.data;
    if (products) {
      console.log('PRODUCT PAGE API CALL: ', products);
      return products;
    }
  } catch (error) {
    console.log('WE HAVE AN ERROR : ', error);
    return NextResponse.json(
      {
        message: 'Error occurred while getting info!',
      },
      { status: 500 }
    );
  }
}
