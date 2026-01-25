export default async function handler(req, res) {
  const { id } = req.query;
  
  // Data dummy - PASTI BEKERJA
  const dataDummy = {
    'NIA-001': {
      id: 'NIA-001',
      nama: 'ELDI SUGIANTO, S.Kom',
      email: 'eldzi4212@gmail.com',
      status: 'AKTIF',
      posisi: 'Anggota',
      whatsapp: '08123456789',
      simpanan_pokok: 0,
      simpanan_wajib: 0,
      simpanan_sukarela: 0,
      total_pinjaman: 0,
      shu_estimasi: 0
    },
    'NIA-002': {
      id: 'NIA-002',
      nama: 'SITI RAHAYU',
      email: 'siti@email.com',
      status: 'AKTIF',
      posisi: 'Anggota',
      whatsapp: '08129876543',
      simpanan_pokok: 500000,
      simpanan_wajib: 100000,
      simpanan_sukarela: 150000,
      total_pinjaman: 2000000,
      shu_estimasi: 60000
    }
  };
  
  // Jika ID ada di data dummy
  if (id && dataDummy[id]) {
    const anggota = dataDummy[id];
    const totalSimpanan = 
      anggota.simpanan_pokok + 
      anggota.simpanan_wajib + 
      anggota.simpanan_sukarela;
    
    return res.json({
      success: true,
      data: {
        ...anggota,
        total_simpanan: totalSimpanan
      },
      timestamp: new Date().toISOString(),
      source: 'dummy-data'
    });
  }
  
  // Jika ID tidak ditemukan
  res.status(404).json({
    success: false,
    error: 'Anggota tidak ditemukan',
    id: id,
    contoh_id: ['NIA-001', 'NIA-002']
  });
}
