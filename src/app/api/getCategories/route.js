import axios, { isCancel, AxiosError } from 'axios';
import { NextResponse } from 'next/server';
export default async function GET() {
  
  const categoryUrl = 'https://api.escuelajs.co/api/v1/categories';
  const url = 'https://corsproxy.io/?' + encodeURIComponent(categoryUrl);

  try {
    const response = await axios.get(url);
    const categories = response.data;

    if (categories) {
      console.log('CATEGORIES API CALL: ', categories);
      return categories;
    }
  } catch (error) {
    console.log('WE HAVE AN ERROR : ', error);
    return NextResponse.json(
      {
        message: 'Error occurred while getting info! ',
        AxiosError,
      },
      { status: 500 }
    );
  }
}
