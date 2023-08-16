// pages/api/verifyCode.ts
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/utils/mongodb';
import { Invitation } from '@/interfaces/invitation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const database = client.db('astriogpetter_no')
        const invitations = database.collection('invitations');

        const invitation = await invitations.findOne({ invitationCode: req.body.code }) as Invitation | null;

        if (invitation !== null) {
            res.status(200).json({ success: true, payload: invitation });
        } else {
            res.status(400).json({ success: false, message: 'Invalid invitation code', payload: req.body.code });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error', payload: req.body.code, error });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
