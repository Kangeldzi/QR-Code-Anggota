import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function getAnggotaById(id) {
  try {
    // 1. Inisialisasi Google Sheets
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    
    // 2. Autentikasi dengan Service Account
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    // 3. Load sheet
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Ambil sheet pertama
    
    // 4. Ambil semua data
    const rows = await sheet.getRows();
    
    // 5. Cari berdasarkan ID
    const anggota = rows.find(row => {
      return row.get('ID') === id || 
             row.get('id') === id || 
             row.get('ID_Anggota') === id;
    });
    
    if (!anggota) {
      return null; // Anggota tidak ditemukan
    }
    
    // 6. Format data
    return {
      id: anggota.get('ID') || id,
      nama: anggota.get('Nama') || '',
      email: anggota.get('Email') || '',
      status: anggota.get('Status') || 'AKTIF',
      posisi: anggota.get('Posisi') || 'Anggota',
      alamat: anggota.get('Alamat') || '',
      whatsapp: anggota.get('WhatsApp') || '',
      jenis_kelamin: anggota.get('Jenis_Kelamin') || '',
      agama: anggota.get('Agama') || '',
      nik: anggota.get('NIK') || '',
      tanggal_bergabung: anggota.get('Tanggal_Bergabung') || '',
      simpanan_pokok: parseFloat(anggota.get('Simpanan_Pokok')) || 0,
      simpanan_wajib: parseFloat(anggota.get('Simpanan_Wajib')) || 0,
      simpanan_sukarela: parseFloat(anggota.get('Simpanan_Sukarela')) || 0,
      foto: anggota.get('Foto') || ''
    };
    
  } catch (error) {
    console.error('Error Google Sheets:', error);
    throw error;
  }
}
