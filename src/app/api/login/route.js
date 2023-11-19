import axios, { isCancel, AxiosError } from 'axios';
import { NextResponse } from 'next/server';
export default async function GET(loginCred) {
  const loginPageUrl = 'https://api.escuelajs.co/api/v1/auth/login';
  const url = 'https://corsproxy.io/?' + encodeURIComponent(loginPageUrl);

  const profileUrl = 'https://api.escuelajs.co/api/v1/auth/profile';
  const url2 = 'https://corsproxy.io/?' + encodeURIComponent(profileUrl);

  try {
    const response = await axios({
      method: 'post',
      url: url,
      data: {
        email: loginCred.email,
        password: loginCred.password,
      },
    });

    const tokenRes = response.data;
    if (tokenRes) {
      const profileRes = await axios({
        method: 'get',
        url: url2,
        headers: { Authorization: `Bearer ${tokenRes.access_token}` },
      });

      if(profileRes) {
        return profileRes;
      } 
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
