import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AnggotaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [anggota, setAnggota] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // Data dummy untuk testing
    const dataDummy = {
      'NIA-001': {
        nama: 'ELDI SUGIANTO, S.Kom',
        email: 'eldzi4212@gmail.com',
        status: 'AKTIF',
        posisi: 'Anggota',
        whatsapp: '08123456789',
        simpanan_pokok: 500000,
        simpanan_wajib: 100000,
        simpanan_sukarela: 250000
      },
      'NIA-002': {
        nama: 'Contoh Anggota 2',
        email: 'anggota2@email.com',
        status: 'AKTIF',
        posisi: 'Anggota',
        whatsapp: '08129876543',
        simpanan_pokok: 500000,
        simpanan_wajib: 100000,
        simpanan_sukarela: 150000
      }
    };
    
    // Simulasi loading
    setTimeout(() => {
      if (dataDummy[id]) {
        setAnggota(dataDummy[id]);
      } else {
        setAnggota({
          nama: `Anggota ${id}`,
          status: 'AKTIF',
          posisi: 'Anggota'
        });
      }
      setLoading(false);
    }, 500);
    
  }, [id]);

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{anggota.nama}</h1>
      <p>ID: {id}</p>
      <p>Email: {anggota.email || 'Belum diisi'}</p>
      <p>Status: {anggota.status}</p>
      <p><a href="/">← Kembali ke Home</a></p>
    </div>
  );
}
