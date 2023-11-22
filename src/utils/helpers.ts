import { Guest } from "@/interfaces/guest";
import Cookies from "js-cookie";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next/types";

async function fetchGuestsFromCookies(context: GetServerSidePropsContext) {
  let guestIds = context.req.cookies.guestIds as string;
  let guests = null;

  if (guestIds) {
    guestIds = JSON.parse(guestIds);

    try {
      const res = await fetch(`${process.env.BASE_URL}/api/getGuests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestIds }),
      });

      if (res.ok) {
        guests = (await res.json())?.payload;
      } else {
        console.log('Error fetching guests');
        throw new Error('Failed to fetch guests');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (!guests && guestIds) {
    // Invalidate the cookie if no guests found
    context.res.setHeader(
      'Set-Cookie',
      'guestIds=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    );

    // Redirect to login page
    const queryString = context.req.url?.split('?')[1];
    return {
      redirect: {
        destination: `/login${queryString ? `?${queryString}` : ''}`,
        permanent: false,
      },
    };
  }

  return guests;
}


export const fetchGuestsForPage = (
  pageServerSideProps?: (context: GetServerSidePropsContext, guests: any) => Promise<GetServerSidePropsResult<any>>
) => async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    
  const guests = await fetchGuestsFromCookies(context);

  // If fetchGuestsFromCookies already handled the redirect, just return
  if (!guests) {
    return { props: {} };
  }

  // Call the original getServerSideProps function for the page, if it exists
  let pageProps = {};
  if (pageServerSideProps) {
    const pageResult = await pageServerSideProps(context, guests);
    if ('props' in pageResult) {
      pageProps = pageResult.props;
    }
  }

  return {
    props: {
      ...pageProps,
      guests,
    },
  };
};

export const pluralGuests = () => {
    const guestIds = Cookies.get('guestIds');

    if (!guestIds) {
        return false;
    }

    const parsedGuestIds = JSON.parse(guestIds);
    return parsedGuestIds.length > 1;
}

export const getGuestDisplayName = (guests: Guest[]) => {
  if (guests.length === 1) {
    return guests[0].firstName;
  } else if (guests.length === 2) {
    return guests[0].firstName + " og " + guests[1].firstName;
  } else {
    let displayName = "";
    for (let i = 0; i < guests.length; i++) {
      if (i === guests.length - 1) {
        displayName += " og " + guests[i].firstName;
      } else {
        displayName += guests[i].firstName + ", ";
      }
    }
    return displayName;
  }
};
