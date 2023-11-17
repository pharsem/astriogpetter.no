import Cookies from "js-cookie";

export const pluralGuests = () => {
    const guestIds = Cookies.get('guestIds');

    if (!guestIds) {
        return false;
    }

    const parsedGuestIds = JSON.parse(guestIds);
    return parsedGuestIds.length > 1;
}

export const getGuests = async () => {
    try {
        // Get the guest IDs from the cookie
        const guestIds = Cookies.get('guestIds');
    
        // Return an empty array if no guest IDs are found
        if (!guestIds) {
          return [];
        }
    
        // Make a request to your API to fetch the guest objects by IDs
        const response = await fetch('/api/getGuests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ guestIds: JSON.parse(guestIds) }),
        });

        // Return an empty array if the response is not OK
        if (!response.ok) {
            console.error('Failed to fetch guest data', response);
            return [];
        }

        // Return the guests from the response
        const { payload: guests } = await response.json();
        return guests;

    } catch (error) {
        console.error('Failed to fetch guest data', error);
        return [];
    }
}
