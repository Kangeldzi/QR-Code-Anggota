// File: api/anggota.js
import { getAnggotaById } from '../../lib/googleSheets.js';

export default async function handler(req, res) {
  console.log('API /api/anggota dipanggil');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'ID diperlukan' });
  }
  
  try {
    console.log('Mencari anggota:', id);
    const anggota = await getAnggotaById(id);
    
    if (!anggota) {
      return res.status(404).json({ error: 'Tidak ditemukan' });
    }
    
    res.status(200).json({
      success: true,
      data: anggota,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
}
