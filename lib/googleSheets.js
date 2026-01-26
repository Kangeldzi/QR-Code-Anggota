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
    
    // 5. Cari berdasarkan ID (cocokkan dengan beberapa kemungkinan nama kolom)
    const anggota = rows.find(row => {
      const rowId = row.get('ID') || row.get('id') || row.get('ID_Anggota');
      return rowId === id;
    });
    
    if (!anggota) {
      console.log(`Anggota dengan ID ${id} tidak ditemukan di sheet.`);
      return null;
    }
    
    // 6. Format data ke objek JavaScript
    // INI ADAPTASI DENGAN HEADER GOOGLE SHEETS ANDA
    const dataAnggota = {
      id: anggota.get('ID') || anggota.get('id') || id,
      nama: anggota.get('Nama') || anggota.get('nama') || '',
      email: anggota.get('Email') || anggota.get('email') || '',
      status: anggota.get('Status') || anggota.get('status') || 'AKTIF',
      posisi: anggota.get('Posisi') || anggota.get('posisi') || 'Anggota',
      alamat: anggota.get('Alamat') || anggota.get('alamat') || '',
      whatsapp: anggota.get('WhatsApp') || anggota.get('whatsapp') || anggota.get('Telepon') || '',
      jenis_kelamin: anggota.get('Jenis_Kelamin') || anggota.get('jenis_kelamin') || anggota.get('Jenis Kelamin') || '',
      agama: anggota.get('Agama') || anggota.get('agama') || '',
      nik: anggota.get('NIK') || anggota.get('nik') || '',
      tanggal_bergabung: anggota.get('Tanggal_Bergabung') || anggota.get('Tanggal Bergabung') || anggota.get('tanggal_bergabung') || '',
      simpanan_pokok: parseFloat(anggota.get('Simpanan_Pokok') || anggota.get('Simpanan Pokok') || anggota.get('simpanan_pokok') || 0),
      simpanan_wajib: parseFloat(anggota.get('Simpanan_Wajib') || anggota.get('Simpanan Wajib') || anggota.get('simpanan_wajib') || 0),
      simpanan_sukarela: parseFloat(anggota.get('Simpanan_Sukarela') || anggota.get('Simpanan Sukarela') || anggota.get('simpanan_sukarela') || 0),
      total_pinjaman: parseFloat(anggota.get('Total_Pinjaman') || anggota.get('Total Pinjaman') || anggota.get('total_pinjaman') || 0),
      shu_estimasi: parseFloat(anggota.get('SHU_Estimasi') || anggota.get('SHU Estimasi') || anggota.get('shu_estimasi') || 0),
      foto: anggota.get('Foto') || anggota.get('foto') || ''
    };
    
    console.log(`Data ditemukan untuk ID ${id}:`, dataAnggota.nama);
    return dataAnggota;
    
  } catch (error) {
    // Tampilkan error yang lebih detail untuk debugging
    console.error('❌ ERROR di getAnggotaById:', error.message);
    if (error.stack) console.error('Stack trace:', error.stack);
    throw error; // Lempar error lagi agar ditangkap oleh API
  }
}
