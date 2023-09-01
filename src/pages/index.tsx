import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get guestIds from cookies
  let guestIds = context.req.cookies.guestIds as string;
  let guests = null;

  if (guestIds) {
    guestIds = JSON.parse(guestIds);

    console.log(guestIds);

    // get guests from database
    const res = await fetch(process.env.BASE_URL + '/api/getGuests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guestIds })
    });

    if (res.ok) {
      guests = (await res.json())?.payload;

      console.log(guests);
    } else {
      console.log('Error fetching guests');
    }

  }

  if (!guests) {
    // if no guests are found, but there is a cookie, the cookie is invalid and should be deleted
    if (guestIds) {
      context.res.setHeader('Set-Cookie', 'guestIds=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
    }
  
    // redirect to login page
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Add your props here if needed
  };
}

function Home() {
  const router = useRouter();

  return (
    <div>
      Welcome to the home page!
    </div>
  );
}

export default Home;