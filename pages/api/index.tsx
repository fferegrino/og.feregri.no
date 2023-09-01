import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const getUrbanistBold = fetch(
  new URL('../../assets/Urbanist-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const getUrbanistRegular = fetch(
  new URL('../../assets/Urbanist-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const getUrbanistThin = fetch(
  new URL('../../assets/Urbanist-Light.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const DEFAULT_TITLE = 'Anurag Roy';
  const DEFAULT_DESCRIPTION =
    'Full-stack developer and aspiring designer from Kolkata, India.';
  const DEFAULT_AVATAR = 'https://og.feregri.no/memoji.png';
  const DEFAULT_AUTHOR = 'anuragroy.dev';
  const DEFAULT_THEME = 'rose';
  const DEFAULT_PATH = '';

  const [urbanistBold, urbanistRegular, urbanistThin] = await Promise.all([
    getUrbanistBold,
    getUrbanistRegular,
    getUrbanistThin
  ]);

  const { searchParams } = req.nextUrl;

  // get content from query params
  const title = searchParams.has('title')
    ? searchParams.get('title')
    : DEFAULT_TITLE;

  const description = searchParams.has('description')
    ? searchParams.get('description')
    : DEFAULT_DESCRIPTION;

  const avatar = searchParams.has('avatar')
    ? searchParams.get('avatar')!
    : DEFAULT_AVATAR;

  const author = searchParams.has('author')
    ? searchParams.get('author')
    : DEFAULT_AUTHOR;

  const logo = searchParams.has('logo') ? searchParams.get('logo') : null;

  const theme = searchParams.has('theme')
    ? searchParams.get('theme')
    : DEFAULT_THEME;

  const path = searchParams.has('path')
    ? searchParams.get('path')
    : DEFAULT_PATH;

  
  const titleSize = title && title.length > 30 ? 'text-6xl' : 'text-8xl';
  const cleanPath = path && path.startsWith('https://') ? path.slice(8) : path;

  return new ImageResponse(
    (
      <div
        tw={`h-full w-full px-18 py-14 bg-${theme}-200 flex flex-col justify-between`}
      >
        <h1 tw={`${titleSize} leading-none`} style={{ fontFamily: 'UrbanistBold' }}>
          {title}
        </h1>
        <p
          tw="mb-16 text-5xl text-gray-900 leading-none"
          style={{ fontFamily: 'UrbanistRegular' }}
        >
          {description}
        </p>
        <div tw="w-full flex flex-row items-center">
          <span tw={`text-4xl text-${theme}-700 mr-auto`}>
            <span style={{ fontFamily: 'UrbanistThin' }}>{cleanPath}</span>
          </span>

          <svg viewBox="0 0 1000 1000" width={50}  xmlns="http://www.w3.org/2000/svg">

  <g id="Base_sharp" data-name="Base sharp">
    <rect x="200" width="200" height="1000"/>
    <rect x="600" width="200" height="1000"/>
    <rect x="400" y="-200" width="200" height="1000" transform="translate(800 -200) rotate(90)"/>
    <rect x="400" y="200" width="200" height="1000" transform="translate(1200 200) rotate(90)"/>
  </g>
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'UrbanistBold',
          data: urbanistBold,
        },
        {
          name: 'UrbanistRegular',
          data: urbanistRegular,
        },
        {
          name: 'UrbanistThin',
          data: urbanistThin,
        },
      ],
    }
  );
}
