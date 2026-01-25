import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AnggotaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [anggota, setAnggota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/anggota?id=${id}`);
      const data = await response.json();
      
      if (data.success) {
        setAnggota(data.data);
        setError(null);
      } else {
        setError(data.error || 'Data tidak ditemukan');
      }
    } catch (err) {
      setError('Gagal mengambil data dari server');
      // Fallback ke data dummy jika API error
      setAnggota({
        nama: `Anggota ${id}`,
        status: 'AKTIF',
        posisi: 'Anggota'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #f3f3f3',
          borderTop: '5px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px' }}>Memuat data dari Google Sheets...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error && !anggota) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Error: {error}</h2>
        <p>ID: {id}</p>
        <button onClick={fetchData}>Coba Lagi</button>
      </div>
    );
  }

  // Format currency
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka || 0);
  };

  // Hitung total
  const totalSimpanan = 
    (anggota?.simpanan_pokok || 0) + 
    (anggota?.simpanan_wajib || 0) + 
    (anggota?.simpanan_sukarela || 0);

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
          marginTop: '10px',
          flexWrap: 'wrap'
        }}>
          <span style={{
            backgroundColor: '#10b981',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>{anggota.status}</span>
          <span style={{
            backgroundColor: '#8b5cf6',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>{anggota.posisi}</span>
        </div>
        <p style={{ marginTop: '15px', opacity: 0.9 }}>
          ID: <strong>{anggota.id || id}</strong>
        </p>
      </div>

      {/* Info Kontak */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#374151', marginTop: 0, borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
          📋 Informasi
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          <div>
            <strong>Email:</strong>
            <p>{anggota.email || 'Belum diisi'}</p>
          </div>
          <div>
            <strong>WhatsApp:</strong>
            <p>{anggota.whatsapp || 'Belum diisi'}</p>
          </div>
          {anggota.nik && (
            <div>
              <strong>NIK:</strong>
              <p>{anggota.nik}</p>
            </div>
          )}
          {anggota.tanggal_bergabung && (
            <div>
              <strong>Bergabung:</strong>
              <p>{new Date(anggota.tanggal_bergabung).toLocaleDateString('id-ID')}</p>
            </div>
          )}
        </div>
        
        {anggota.alamat && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
            <strong>Alamat:</strong>
            <p>{anggota.alamat}</p>
          </div>
        )}
      </div>

      {/* Simpanan */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#374151', marginTop: 0, borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
          💰 Simpanan
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '15px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <div style={{ padding: '15px', border: '2px solid #3b82f6', borderRadius: '8px' }}>
            <h3 style={{ color: '#3b82f6', margin: '0 0 10px 0', fontSize: '16px' }}>Pokok</h3>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              {formatRupiah(anggota.simpanan_pokok)}
            </p>
          </div>
          <div style={{ padding: '15px', border: '2px solid #10b981', borderRadius: '8px' }}>
            <h3 style={{ color: '#10b981', margin: '0 0 10px 0', fontSize: '16px' }}>Wajib</h3>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              {formatRupiah(anggota.simpanan_wajib)}
            </p>
          </div>
          <div style={{ padding: '15px', border: '2px solid #8b5cf6', borderRadius: '8px' }}>
            <h3 style={{ color: '#8b5cf6', margin: '0 0 10px 0', fontSize: '16px' }}>Sukarela</h3>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
              {formatRupiah(anggota.simpanan_sukarela)}
            </p>
          </div>
          <div style={{ padding: '15px', border: '2px solid #f59e0b', borderRadius: '8px', backgroundColor: '#fffbeb' }}>
            <h3 style={{ color: '#f59e0b', margin: '0 0 10px 0', fontSize: '16px' }}>Total</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
              {formatRupiah(totalSimpanan)}
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
        <p style={{ fontSize: '12px', color: '#9ca3af' }}>
          Data real-time dari Google Sheets • Terakhir update: {new Date().toLocaleTimeString('id-ID')}
        </p>
        <button 
          onClick={fetchData}
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );
}
