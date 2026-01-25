// api/anggota.js (DUMMY VERSION - untuk testing)
export default async function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'ID diperlukan' });
  }
  
  // Data dummy
  const dataDummy = {
    'NIA-001': {
      id: 'NIA-001',
      nama: 'ELDI SUGIANTO, S.Kom',
      email: 'eldzi4212@gmail.com',
      status: 'AKTIF',
      posisi: 'Anggota',
      whatsapp: '08123456789',
      simpanan_pokok: 500000,
      simpanan_wajib: 100000,
      simpanan_sukarela: 250000
    }
  };
  
  if (dataDummy[id]) {
    res.json({
      success: true,
      data: dataDummy[id],
      timestamp: new Date().toISOString(),
      source: 'dummy-data'
    });
  } else {
    res.status(404).json({ 
      error: 'Anggota tidak ditemukan',
      id: id 
    });
  }
}
