import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AnggotaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [anggota, setAnggota] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    // DATA DUMMY untuk testing
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
        email: 'contoh2@email.com',
        status: 'AKTIF',
        posisi: 'Anggota',
        whatsapp: '08129876543',
        simpanan_pokok: 500000,
        simpanan_wajib: 100000,
        simpanan_sukarela: 150000
      }
    };
    
    // Cari data berdasarkan ID
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
    
  }, [id]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh'
      }}>
        <p>Memuat data anggota...</p>
      </div>
    );
  }

  const totalSimpanan = 
    (anggota.simpanan_pokok || 0) + 
    (anggota.simpanan_wajib || 0) + 
    (anggota.simpanan_sukarela || 0);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '30px',
        borderRadius: '15px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px 0' }}>{anggota.nama}</h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '10px'
        }}>
          <span style={{
            backgroundColor: '#10b981',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '14px'
          }}>{anggota.status}</span>
          <span style={{
            backgroundColor: '#8b5cf6',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '14px'
          }}>{anggota.posisi}</span>
        </div>
        <p style={{ marginTop: '15px', opacity: 0.9 }}>ID Anggota: <strong>{id}</strong></p>
      </div>

      {/* Info Kontak */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#374151', marginTop: 0 }}>📞 Informasi Kontak</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Email:</strong>
            <p>{anggota.email || 'Belum diisi'}</p>
          </div>
          <div>
            <strong>WhatsApp:</strong>
            <p>{anggota.whatsapp || 'Belum diisi'}</p>
          </div>
        </div>
      </div>

      {/* Simpanan */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#374151', marginTop: 0 }}>💰 Simpanan</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '15px',
          textAlign: 'center'
        }}>
          <div style={{ padding: '15px', border: '2px solid #3b82f6', borderRadius: '8px' }}>
            <h3 style={{ color: '#3b82f6', margin: '0 0 10px 0' }}>Pokok</h3>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              Rp {anggota.simpanan_pokok?.toLocaleString('id-ID') || '0'}
            </p>
          </div>
          <div style={{ padding: '15px', border: '2px solid #10b981', borderRadius: '8px' }}>
            <h3 style={{ color: '#10b981', margin: '0 0 10px 0' }}>Wajib</h3>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              Rp {anggota.simpanan_wajib?.toLocaleString('id-ID') || '0'}
            </p>
          </div>
          <div style={{ padding: '15px', border: '2px solid #8b5cf6', borderRadius: '8px' }}>
            <h3 style={{ color: '#8b5cf6', margin: '0 0 10px 0' }}>Sukarela</h3>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              Rp {anggota.simpanan_sukarela?.toLocaleString('id-ID') || '0'}
            </p>
          </div>
          <div style={{ padding: '15px', border: '2px solid #f59e0b', borderRadius: '8px', backgroundColor: '#fffbeb' }}>
            <h3 style={{ color: '#f59e0b', margin: '0 0 10px 0' }}>Total</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
              Rp {totalSimpanan.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        color: '#6b7280',
        fontSize: '14px',
        borderTop: '1px solid #e5e7eb',
        marginTop: '20px'
      }}>
        <p>Koperasi Digital © {new Date().getFullYear()}</p>
        <p>Data diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
      </div>
    </div>
  );
}
