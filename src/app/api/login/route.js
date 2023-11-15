import axios, { isCancel, AxiosError } from 'axios';
import { NextResponse } from 'next/server';
export default async function GET(loginCred) {
  const loginPageUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  const url = 'https://corsproxy.io/?' + encodeURIComponent(loginPageUrl);

  try {
    // const response = await axios.post(url);
    const response = await axios({
      method: 'post',
      url: url,
      data: {
        email: loginCred.email,
        password: loginCred.password,
      },
    });
    const loginRes = response.data;
    if (loginRes) {
      console.log('LOGIN PAGE API CALL: ', loginRes);
      return loginRes;
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
