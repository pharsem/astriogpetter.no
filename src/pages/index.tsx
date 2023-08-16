import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get guestIds from cookies
  let guestIds = context.req.cookies.guestIds as string;

  // parse guestId array
  guestIds = JSON.parse(guestIds);

  console.log(guestIds);

  // get guests from database
  const guests = await fetch('/api/getGuests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestIds })
  });

  console.log(guests);

  if (!guests) {
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