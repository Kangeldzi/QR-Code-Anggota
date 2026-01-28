import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(req, res) {
    const { id } = req.query;
    
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    // CARI ANGGOTA BERDASARKAN ID
    const anggota = rows.find(row => row.get('ID') === id);
    
    if (anggota) {
        res.json({
            success: true,
            data: {
                id: anggota.get('ID'),
                nama: anggota.get('Nama'),
                email: anggota.get('Email'),
                status: anggota.get('Status'),
                // ... data lainnya
            }
        });
    } else {
        res.status(404).json({ error: 'Anggota tidak ditemukan' });
    }
}
