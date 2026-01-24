import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AnggotaPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [anggota, setAnggota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState('');

  // Data dummy (nanti diganti dengan Google Sheets API)
  const dataDummy = {
    'NIA-001': {
      nama: 'ELDI SUGIANTO, S.Kom',
      email: 'eldzi4212@gmail.com',
      status: 'AKTIF',
      posisi: 'Anggota',
      alamat: 'Jl. Merdeka No. 123, Jakarta',
      whatsapp: '08123456789',
      jenis_kelamin: 'Laki-laki',
      agama: 'Islam',
      nik: '1234567890123456',
      tanggal_bergabung: '2023-01-15',
      simpanan_pokok: 500000,
      simpanan_wajib: 100000,
      simpanan_sukarela: 250000,
      total_pinjaman: 0,
      shu_estimasi: 75000,
      foto: 'https://ui-avatars.com/api/?name=Eldi+Sugianto&background=3b82f6&color=fff&size=200'
    },
    'NIA-002': {
      nama: 'SITI RAHAYU',
      email: 'siti@email.com',
      status: 'AKTIF',
      posisi: 'Anggota',
      alamat: 'Jl. Sudirman No. 45, Bandung',
      whatsapp: '08129876543',
      jenis_kelamin: 'Perempuan',
      agama: 'Islam',
      nik: '2345678901234567',
      tanggal_bergabung: '2023-02-20',
      simpanan_pokok: 500000,
      simpanan_wajib: 100000,
      simpanan_sukarela: 150000,
      total_pinjaman: 2000000,
      shu_estimasi: 60000,
      foto: 'https://ui-avatars.com/api/?name=Siti+Rahayu&background=10b981&color=fff&size=200'
    },
    'NIA-003': {
      nama: 'AGUS WIJAYA',
      email: 'agus@email.com',
      status: 'AKTIF',
      posisi: 'Pengurus',
      alamat: 'Jl. Thamrin No. 89, Surabaya',
      whatsapp: '08127778888',
      jenis_kelamin: 'Laki-laki',
      agama: 'Kristen',
      nik: '3456789012345678',
      tanggal_bergabung: '2022-11-10',
      simpanan_pokok: 1000000,
      simpanan_wajib: 200000,
      simpanan_sukarela: 500000,
      total_pinjaman: 5000000,
      shu_estimasi: 150000,
      foto: 'https://ui-avatars.com/api/?name=Agus+Wijaya&background=8b5cf6&color=fff&size=200'
    }
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    
    // Simulasi API call delay
    setTimeout(() => {
      // Cari data berdasarkan ID
      if (dataDummy[id]) {
        setAnggota(dataDummy[id]);
      } else {
        // Jika tidak ditemukan, buat data default
        setAnggota({
          nama: `Anggota ${id}`,
          status: 'AKTIF',
          posisi: 'Anggota',
          simpanan_pokok: 0,
          simpanan_wajib: 0,
          simpanan_sukarela: 0,
          total_pinjaman: 0,
          shu_estimasi: 0
        });
      }
      
      setLastUpdate(new Date().toLocaleTimeString('id-ID'));
      setLoading(false);
    }, 300);
    
  }, [id]);

  // Format currency Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka || 0);
  };

  // Format tanggal
  const formatTanggal = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Hitung total simpanan
  const totalSimpanan = 
    (anggota.simpanan_pokok || 0) + 
    (anggota.simpanan_wajib || 0) + 
    (anggota.simpanan_sukarela || 0);

  return (
    <div style={styles.container}>
      {/* Header Profile */}
      <div style={styles.profileHeader}>
        <img 
          src={anggota.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(anggota.nama)}&background=3b82f6&color=fff&size=200`}
          alt={anggota.nama}
          style={styles.profileImage}
        />
        <div style={styles.profileInfo}>
          <h1 style={styles.nama}>{anggota.nama}</h1>
          <div style={styles.badgeContainer}>
            <span style={{...styles.badge, backgroundColor: '#10b981'}}>
              {anggota.status}
            </span>
            <span style={{...styles.badge, backgroundColor: '#3b82f6'}}>
              {anggota.posisi}
            </span>
            <span style={{...styles.badge, backgroundColor: '#8b5cf6'}}>
              ID: {id}
            </span>
          </div>
          <p style={styles.updateTime}>🕒 Terakhir update: {lastUpdate}</p>
        </div>
      </div>

      {/* Info Pribadi */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📋 Informasi Pribadi</h2>
        <div style={styles.infoGrid}>
          <InfoItem label="Email" value={anggota.email} />
          <InfoItem label="WhatsApp" value={anggota.whatsapp} />
          <InfoItem label="NIK" value={anggota.nik} />
          <InfoItem label="Jenis Kelamin" value={anggota.jenis_kelamin} />
          <InfoItem label="Agama" value={anggota.agama} />
          <InfoItem label="Tanggal Bergabung" value={formatTanggal(anggota.tanggal_bergabung)} />
        </div>
        {anggota.alamat && (
          <div style={styles.alamatBox}>
            <h3 style={styles.subTitle}>🏠 Alamat</h3>
            <p>{anggota.alamat}</p>
          </div>
        )}
      </div>

      {/* Simpanan */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>💰 Simpanan</h2>
        <div style={styles.simpananGrid}>
          <SimpananCard 
            title="Simpanan Pokok" 
            amount={anggota.simpanan_pokok} 
            color="#3b82f6" 
            icon="🏦"
          />
          <SimpananCard 
            title="Simpanan Wajib" 
            amount={anggota.simpanan_wajib} 
            color="#10b981" 
            icon="📅"
          />
          <SimpananCard 
            title="Simpanan Sukarela" 
            amount={anggota.simpanan_sukarela} 
            color="#8b5cf6" 
            icon="💵"
          />
          <SimpananCard 
            title="Total Simpanan" 
            amount={totalSimpanan} 
            color="#f59e0b" 
            icon="💰"
            isTotal={true}
          />
        </div>
      </div>

      {/* Pinjaman & SHU */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📊 Pinjaman & SHU</h2>
        <div style={styles.financeGrid}>
          <FinanceCard 
            title="Total Pinjaman" 
            amount={anggota.total_pinjaman} 
            color="#ef4444" 
            icon="🏦"
          />
          <FinanceCard 
            title="Estimasi SHU" 
            amount={anggota.shu_estimasi} 
            color="#10b981" 
            icon="📈"
          />
        </div>
      </div>

      {/* QR Code Info */}
      <div style={styles.qrSection}>
        <h3>🔗 QR Code Pribadi</h3>
        <p>Scan QR Code di kartu anggota untuk mengakses halaman ini kapan saja</p>
        <div style={styles.qrPlaceholder}>
          <div style={styles.qrCode}>
            {/* QR Code akan digenerate nanti */}
            <div style={styles.qrMock}>
              <div style={styles.qrPattern}></div>
              <p>QR Code untuk {id}</p>
            </div>
          </div>
          <div style={styles.qrInfo}>
            <p><strong>URL:</strong> https://qr-code-anggota.vercel.app/anggota/{id}</p>
            <p><small>Data update real-time dari sistem koperasi</small></p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>Koperasi Digital © {new Date().getFullYear()}</p>
        <p style={styles.disclaimer}>
          Data ini bersifat rahasia dan hanya untuk keperluan internal koperasi
        </p>
      </div>
    </div>
  );
}

// Komponen kecil
function InfoItem({ label, value }) {
  return (
    <div style={infoItemStyles.container}>
      <div style={infoItemStyles.label}>{label}</div>
      <div style={infoItemStyles.value}>{value || 'Belum diisi'}</div>
    </div>
  );
}

function SimpananCard({ title, amount, color, icon, isTotal = false }) {
  return (
    <div style={{
      ...simpananCardStyles.container,
      borderColor: color,
      backgroundColor: isTotal ? `${color}15` : 'white'
    }}>
      <div style={simpananCardStyles.header}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <h3 style={{...simpananCardStyles.title, color}}>{title}</h3>
      </div>
      <div style={{...simpananCardStyles.amount, color}}>
        {formatRupiah(amount)}
      </div>
    </div>
  );
}

function FinanceCard({ title, amount, color, icon }) {
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka || 0);
  };

  return (
    <div style={{
      ...financeCardStyles.container,
      borderColor: color
    }}>
      <div style={financeCardStyles.header}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
        <h3 style={{...financeCardStyles.title, color}}>{title}</h3>
      </div>
      <div style={{...financeCardStyles.amount, color}}>
        {formatRupiah(amount)}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={loadingStyles.container}>
      <div style={loadingStyles.spinner}></div>
      <p style={loadingStyles.text}>Memuat data anggota...</p>
      <p style={loadingStyles.subtext}>Mohon tunggu sebentar</p>
    </div>
  );
}

// Format currency helper
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka || 0);
}

// Styles
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  profileHeader: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    flexWrap: 'wrap'
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '5px solid #e2e8f0'
  },
  profileInfo: {
    flex: 1,
    minWidth: '300px'
  },
  nama: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 15px 0',
    color: '#1e293b'
  },
  badgeContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '15px'
  },
  badge: {
    padding: '8px 20px',
    borderRadius: '25px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    display: 'inline-block'
  },
  updateTime: {
    color: '#64748b',
    fontSize: '14px',
    margin: '10px 0 0 0'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 0 25px 0',
    color: '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '25px'
  },
  alamatBox: {
    padding: '20px',
    backgroundColor: '#f0f9ff',
    borderRadius: '10px',
    border: '1px solid #bae6fd'
  },
  subTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 10px 0',
    color: '#0369a1'
  },
  simpananGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  },
  financeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  qrSection: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  qrPlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '20px',
    flexWrap: 'wrap'
  },
  qrCode: {
    textAlign: 'center'
  },
  qrMock: {
    width: '180px',
    height: '180px',
    backgroundColor: '#f3f4f6',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #d1d5db'
  },
  qrPattern: {
    width: '100px',
    height: '100px',
    backgroundColor: '#374151',
    borderRadius: '5px',
    marginBottom: '10px'
  },
  qrInfo: {
    textAlign: 'left',
    maxWidth: '400px'
  },
  footer: {
    textAlign: 'center',
    padding: '25px',
    color: '#64748b',
    fontSize: '14px',
    borderTop: '1px solid #e5e7eb',
    marginTop: '30px'
  },
  disclaimer: {
    fontSize: '12px',
    color: '#9ca3af',
    marginTop: '10px'
  }
};

const infoItemStyles = {
  container: {
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  label: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '5px',
    fontWeight: '500'
  },
  value: {
    fontSize: '16px',
    color: '#1e293b',
    fontWeight: '600'
  }
};

const simpananCardStyles = {
  container: {
    padding: '25px',
    borderRadius: '12px',
    border: '2px solid',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '15px'
  },
  title: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '600'
  },
  amount: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0'
  }
};

const financeCardStyles = {
  container: {
    padding: '30px',
    borderRadius: '12px',
    border: '2px solid',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  title: {
    margin: '0',
    fontSize: '20px',
    fontWeight: '600'
  },
  amount: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0'
  }
};

const loadingStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8fafc'
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '6px solid #f3f3f3',
    borderTop: '6px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  text: {
    fontSize: '18px',
    color: '#374151',
    margin: '0 0 10px 0'
  },
  subtext: {
    fontSize: '14px',
    color: '#6b7280'
  }
};

// Add CSS animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
