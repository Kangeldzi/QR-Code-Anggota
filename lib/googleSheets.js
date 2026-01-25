import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function getAnggotaById(id) {
  try {
    console.log('🔍 Mencari anggota dengan ID:', id);
    
    // 1. Inisialisasi
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    
    // 2. Autentikasi
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    
    // 3. Load sheet
    await doc.loadInfo();
    console.log('📊 Sheet loaded:', doc.title);
    
    // Ambil sheet pertama
    const sheet = doc.sheetsByIndex[0];
    
    // 4. Load rows
    const rows = await sheet.getRows();
    console.log('📈 Total rows:', rows.length);
    
    // 5. Debug: Tampilkan semua ID yang ada
    console.log('🔢 IDs dalam sheet:');
    rows.forEach((row, index) => {
      const rowId = row.get('ID') || row.get('id') || row.get('ID_Anggota');
      console.log(`  Row ${index + 1}: "${rowId}"`);
    });
    
    // 6. Cari berdasarkan ID (fleksibel)
    const anggota = rows.find(row => {
      const rowId = row.get('ID') || row.get('id') || row.get('ID_Anggota');
      console.log(`🔍 Comparing: "${rowId}" with "${id}"`);
      return rowId === id;
    });
    
    if (!anggota) {
      console.log('❌ Anggota tidak ditemukan');
      return null;
    }
    
    console.log('✅ Anggota ditemukan:', anggota.get('Nama'));
    
    // 7. Format data (dengan fallback)
    return {
      id: anggota.get('ID') || anggota.get('id') || id,
      nama: anggota.get('Nama') || anggota.get('nama') || '',
      email: anggota.get('Email') || anggota.get('email') || '',
      status: anggota.get('Status') || anggota.get('status') || 'AKTIF',
      posisi: anggota.get('Posisi') || anggota.get('posisi') || 'Anggota',
      alamat: anggota.get('Alamat') || anggota.get('alamat') || '',
      whatsapp: anggota.get('WhatsApp') || anggota.get('whatsapp') || '',
      jenis_kelamin: anggota.get('Jenis_Kelamin') || anggota.get('jenis_kelamin') || '',
      agama: anggota.get('Agama') || anggota.get('agama') || '',
      nik: anggota.get('NIK') || anggota.get('nik') || '',
      tanggal_bergabung: anggota.get('Tanggal_Bergabung') || anggota.get('tanggal_bergabung') || '',
      simpanan_pokok: parseFloat(anggota.get('Simpanan_Pokok') || anggota.get('simpanan_pokok') || 0),
      simpanan_wajib: parseFloat(anggota.get('Simpanan_Wajib') || anggota.get('simpanan_wajib') || 0),
      simpanan_sukarela: parseFloat(anggota.get('Simpanan_Sukarela') || anggota.get('simpanan_sukarela') || 0),
      total_pinjaman: parseFloat(anggota.get('Total_Pinjaman') || anggota.get('total_pinjaman') || 0),
      shu_estimasi: parseFloat(anggota.get('SHU_Estimasi') || anggota.get('shu_estimasi') || 0),
      foto: anggota.get('Foto') || anggota.get('foto') || ''
    };
    
  } catch (error) {
    console.error('🔥 ERROR Google Sheets:', error);
    throw error;
  }
}
