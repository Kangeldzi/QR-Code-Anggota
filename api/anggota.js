import { getAnggotaById } from '../../lib/googleSheets.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Tangani OPTIONS request (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Hanya terima GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ 
      error: 'ID anggota diperlukan',
      contoh: '/api/anggota?id=NIA-001' 
    });
  }
  
  try {
    const anggota = await getAnggotaById(id);
    
    if (!anggota) {
      return res.status(404).json({ 
        error: 'Anggota tidak ditemukan',
        id: id 
      });
    }
    
    // Hitung total simpanan
    const totalSimpanan = 
      (anggota.simpanan_pokok || 0) + 
      (anggota.simpanan_wajib || 0) + 
      (anggota.simpanan_sukarela || 0);
    
    // Response sukses
    res.status(200).json({
      success: true,
      data: {
        ...anggota,
        total_simpanan: totalSimpanan
      },
      timestamp: new Date().toISOString(),
      source: 'google-sheets'
    });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Terjadi kesalahan server',
      message: error.message 
    });
  }
}
