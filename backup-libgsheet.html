import { GoogleSpreadsheet } from 'google-spreadsheet.js';

export async function getAnggotaById(id) {
  try {
    console.log('🔍 Mencari anggota dengan ID:', id);
    
    // 1. Validasi environment variables
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Environment variables untuk Google Sheets belum di-set!');
    }
    
    // 2. Inisialisasi Google Sheets
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    console.log('📊 Google Sheet ID:', process.env.GOOGLE_SHEET_ID.substring(0, 10) + '...');
    
    // 3. Autentikasi dengan Service Account
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    // 4. Load sheet
    await doc.loadInfo();
    console.log('✅ Sheet loaded:', doc.title);
    
    // 5. Ambil sheet pertama (indeks 0)
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    console.log(`📋 Total baris di sheet: ${rows.length}`);
    
    // 6. Cari anggota berdasarkan ID
    console.log('🔎 Mencari ID di sheet...');
    let anggota = null;
    
    // Coba beberapa kemungkinan nama kolom
    for (const row of rows) {
      const rowId = row.get('ID') || row.get('id') || row.get('ID_Anggota') || row.get('Kode');
      console.log(`  - Baris: ${rowId}`);
      if (rowId === id) {
        anggota = row;
        break;
      }
    }
    
    if (!anggota) {
      console.log('❌ Anggota tidak ditemukan');
      return null;
    }
    
    // 7. Format data
    console.log('✅ Anggota ditemukan, memformat data...');
    const data = {
      id: anggota.get('ID') || anggota.get('id') || id,
      nama: anggota.get('Nama') || anggota.get('nama') || '',
      email: anggota.get('Email') || anggota.get('email') || '',
      status: anggota.get('Status') || anggota.get('status') || 'AKTIF',
      posisi: anggota.get('Posisi') || anggota.get('posisi') || 'Anggota',
      alamat: anggota.get('Alamat') || anggota.get('alamat') || '',
      whatsapp: anggota.get('WhatsApp') || anggota.get('whatsapp') || '',
      jenis_kelamin: anggota.get('Jenis_Kelamin') || anggota.get('Jenis Kelamin') || anggota.get('jenis_kelamin') || '',
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
    
    console.log('✅ Data berhasil diambil:', data.nama);
    return data;
    
  } catch (error) {
    console.error('❌ ERROR di googleSheets.js:', error.message);
    console.error('Stack trace:', error.stack);
    throw error;
  }
}
