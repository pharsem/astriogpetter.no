// pages/api/getGuests.ts
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/utils/mongodb';
import { Guest } from '@/interfaces/guest';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const database = client.db('astriogpetter_no');
        const guestsCollection = database.collection('guests');

        const guests = await Promise.all(req.body.guestIds.map(async (guestId: string) => {
            console.log("Querying for ID: ", guestId);  // Additional logging

            // Explicitly convert to ObjectId if needed
            const guest = await guestsCollection.findOne({ _id: new ObjectId(guestId) }) as Guest | null;
            console.log("Found guest: ", guest);  // Log found guest

            return guest;
        }));

        if (guests.length > 0 && !guests.includes(null)) {
            res.status(200).json({ success: true, payload: guests });
        } else {
            res.status(400).json({ success: false, message: 'Invalid guest IDs', payload: req.body.guestIds });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error', payload: req.body, error });
    }
}