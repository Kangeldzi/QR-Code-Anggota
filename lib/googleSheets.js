// File: lib/googleSheets.js - VERSI TEST SEDERHANA
export async function getAnggotaById(id) {
  console.log('✅ getAnggotaById DIPANGGIL untuk ID:', id);
  
  // Kembalikan data statis dulu, untuk test koneksi modul
  const dataTest = {
    id: id,
    nama: 'Nama Test dari API',
    email: 'test@email.com',
    status: 'AKTIF',
    posisi: 'Anggota',
    alamat: 'Alamat Test',
    whatsapp: '08123456',
    jenis_kelamin: 'Laki-laki',
    agama: 'Islam',
    nik: '123456789',
    tanggal_bergabung: '2024-01-01',
    simpanan_pokok: 100000,
    simpanan_wajib: 50000,
    simpanan_sukarela: 25000,
    total_pinjaman: 0,
    shu_estimasi: 15000,
    foto: ''
  };
  
  console.log('📤 Mengembalikan data test:', dataTest.nama);
  return dataTest;
}
