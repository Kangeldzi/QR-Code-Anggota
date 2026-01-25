import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AnggotaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [anggota, setAnggota] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    fetch(`/api/anggota?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnggota(data.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
      
  }, [id]);

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
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px' }}>Memuat data anggota {id}...</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!anggota) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Anggota tidak ditemukan</h2>
        <p>ID: {id}</p>
        <p>Contoh ID yang valid: NIA-001, NIA-002</p>
        <a href="/" style={{ 
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          ← Kembali ke Home
        </a>
      </div>
    );
  }

  // Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

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
        <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
          {anggota.nama}
        </h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '15px',
          flexWrap: 'wrap'
        }}>
          <span style={{
            backgroundColor: '#10b981',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {anggota.status}
          </span>
          <span style={{
            backgroundColor: '#8b5cf6',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {anggota.posisi}
          </span>
          <span style={{
            backgroundColor: '#f59e0b',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            ID: {anggota.id}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#374151', marginTop: 0, marginBottom: '20px' }}>
          📋 Informasi
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px'
        }}>
          <div>
            <strong>Email:</strong>
            <p>{anggota.email}</p>
          </div>
          <div>
            <strong>WhatsApp:</strong>
            <p>{anggota.whatsapp}</p>
          </div>
          <div>
            <strong>Total Pinjaman:</strong>
            <p>{formatRupiah(anggota.total_pinjaman)}</p>
          </div>
          <div>
            <strong>Estimasi SHU:</strong>
            <p>{formatRupiah(anggota.shu_estimasi)}</p>
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
        <h2 style={{ color: '#374151', marginTop: 0, marginBottom: '20px' }}>
          💰 Simpanan
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '15px',
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
              {formatRupiah(anggota.total_simpanan)}
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      <div style={{
        backgroundColor: '#f0f9ff',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        border: '2px solid #bae6fd'
      }}>
        <p style={{ margin: 0, color: '#0369a1' }}>
          ✅ <strong>Build Sukses!</strong> Data dari API dummy. 
          Selanjutnya integrasi Google Sheets.
        </p>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        color: '#6b7280',
        fontSize: '14px',
        marginTop: '30px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p>Koperasi Digital © {new Date().getFullYear()}</p>
        <a href="/" style={{ 
          display: 'inline-block',
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          ← Kembali ke Home
        </a>
      </div>
    </div>
  );
}
