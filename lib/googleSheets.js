import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function getAnggotaById(id) {
  try {
    console.log('Mencari anggota dengan ID:', id);
    
    // Inisialisasi
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    
    // Auth
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    // Cari anggota
    const anggotaRow = rows.find(row => row.get('ID') === id);
    
    if (!anggotaRow) {
      console.log('Anggota tidak ditemukan');
      return null;
    }
    
    // Return data simple
    return {
      id: anggotaRow.get('ID'),
      nama: anggotaRow.get('Nama'),
      email: anggotaRow.get('Email'),
      status: anggotaRow.get('Status')
    };
    
  } catch (error) {
    console.error('ERROR Google Sheets:', error.message);
    return null;
  }
}
