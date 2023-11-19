import axios, { isCancel, AxiosError } from 'axios';
import { NextResponse } from 'next/server';
export default async function GET(id) {
  const productUrl = 'https://api.escuelajs.co/api/v1/products/' + id;
  const url = 'https://corsproxy.io/?' + encodeURIComponent(productUrl);
  try {
    const response = await axios.get(url);
    const products = response.data;
    if (products) {
      console.log('PRODUCT API CALL: ', products);
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
