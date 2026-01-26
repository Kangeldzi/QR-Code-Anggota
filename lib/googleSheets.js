// SIMPLE TEST - Pastikan modul bekerja
export async function getAnggotaById(id) {
  console.log('🔄 TEST: getAnggotaById called with:', id);
  
  // Return static data dulu
  return {
    id: id,
    nama: 'DATA TEST DARI MODUL',
    status: 'AKTIF',
    message: 'Modul berhasil di-load!'
  };
}
