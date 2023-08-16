// pages/api/getGuests.ts
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/utils/mongodb';
import { Guest } from '@/interfaces/guest';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const database = client.db('astriogpetter_no')
        const invitations = database.collection('invitations');

        // for each guest ID sent in, get the guest from the database
        const guests = await Promise.all(req.body.guestIds.map(async (guestId: ObjectId) => {
            const guest = await invitations.findOne({ _id: guestId }) as Guest | null;
            return guest;
        }));

        // if at least one guest was found, return the guests
        if (guests.length > 0) {
            res.status(200).json({ success: true, payload: guests });
        } else {
            res.status(400).json({ success: false, message: 'Invalid guest IDs', payload: req.body.guestIds });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error', payload: req.body, error });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
