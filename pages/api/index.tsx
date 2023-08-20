import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

const getOutfit = fetch(
  new URL('../../assets/Outfit-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const getCaprasimo = fetch(
  new URL('../../assets/Caprasimo-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const getRobotoRegular = fetch(
  new URL('../../assets/Roboto-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());
const getRobotoMonoRegular = fetch(
  new URL('../../assets/RobotoMono-Regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const DEFAULT_TITLE = 'Anurag Roy';
  const DEFAULT_DESCRIPTION =
    'Full-stack developer and aspiring designer from Kolkata, India.';
  const DEFAULT_AVATAR = 'https://og.feregri.no/memoji.png';
  const DEFAULT_AUTHOR = 'anuragroy.dev';
  const DEFAULT_THEME = 'rose';
  const DEFAULT_PATH = '';

  const [outfit, caprasimo, robotoRegular, robotoMonoRegular] = await Promise.all([
    getOutfit,
    getCaprasimo,
    getRobotoRegular,
    getRobotoMonoRegular,
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

  return new ImageResponse(
    (
      <div
        tw={`h-full w-full px-18 py-14 bg-${theme}-200 flex flex-col justify-between`}
      >
        <h1 tw="text-8xl leading-none" style={{ fontFamily: 'Caprasimo' }}>
          {title}
        </h1>
        <p
          tw="mb-16 text-5xl text-gray-900 leading-none"
          style={{ fontFamily: 'Outfit' }}
        >
          {description}
        </p>
        <div tw="w-full flex flex-row items-center">
          <span tw={`text-3xl text-${theme}-600 mr-auto`}>
            <span style={{ fontFamily: 'RobotoMonoRegular' }}>TechLingo.fyi/{path}</span>
          </span>

          <svg viewBox="0 0 512 512" width={50}  xmlns="http://www.w3.org/2000/svg">
            <path d="M478.33,433.6l-90-218a22,22,0,0,0-40.67,0l-90,218a22,22,0,1,0,40.67,16.79L316.66,406H419.33l18.33,44.39A22,22,0,0,0,458,464a22,22,0,0,0,20.32-30.4ZM334.83,362,368,281.65,401.17,362Z"/><path d="M267.84,342.92a22,22,0,0,0-4.89-30.7c-.2-.15-15-11.13-36.49-34.73,39.65-53.68,62.11-114.75,71.27-143.49H330a22,22,0,0,0,0-44H214V70a22,22,0,0,0-44,0V90H54a22,22,0,0,0,0,44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-31.41-41.68-43.08-68.65-43.17-68.87a22,22,0,0,0-40.58,17c.58,1.38,14.55,34.23,52.86,83.93.92,1.19,1.83,2.35,2.74,3.51-39.24,44.35-77.74,71.86-93.85,80.74a22,22,0,1,0,21.07,38.63c2.16-1.18,48.6-26.89,101.63-85.59,22.52,24.08,38,35.44,38.93,36.1a22,22,0,0,0,30.75-4.9Z"/>
          </svg>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Outfit',
          data: outfit,
        },
        {
          name: 'Caprasimo',
          data: caprasimo,
        },
        {
          name: 'RobotoRegular',
          data: robotoRegular,
        },
        {
          name: 'RobotoMonoRegular',
          data: robotoMonoRegular,
        },
      ],
    }
  );
}
