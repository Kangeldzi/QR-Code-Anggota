import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AnggotaPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [anggota, setAnggota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [activeTab, setActiveTab] = useState('simpanan');

  useEffect(() => {
    if (!id) return;
    fetchData();
    
    // Auto-refresh data setiap 30 detik
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/anggota?id=${id}`);
      const data = await response.json();
      
      if (data.success) {
        setAnggota(data.data);
        setLastUpdate(new Date(data.timestamp));
      } else {
        console.error('API Error:', data.error);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka || 0);
  };

  // Format Tanggal
  const formatTanggal = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Loading State
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Memuat data dari Google Sheets...</p>
        <p style={styles.smallText}>ID: {id}</p>
      </div>
    );
  }

  if (!anggota) {
    return (
      <div style={styles.errorContainer}>
        <h2>⚠️ Data tidak ditemukan</h2>
        <p>ID Anggota: <strong>{id}</strong> tidak ditemukan di database</p>
        <button onClick={fetchData} style={styles.button}>
          🔄 Coba Lagi
        </button>
      </div>
    );
  }

  // Hitung total simpanan
  const totalSimpanan = 
    (anggota.simpanan_pokok || 0) + 
    (anggota.simpanan_wajib || 0) + 
    (anggota.simpanan_sukarela || 0);

  // Hitung total pinjaman (jika ada data cicilan)
  const totalPinjaman = anggota.total_pinjaman || 0;
  const sisaPinjaman = totalPinjaman - (anggota.cicilan_dibayar || 0);

  return (
    <>
      <Head>
        <title>Kartu Anggota - {anggota.nama}</title>
        <meta name="description" content={`Kartu anggota koperasi: ${anggota.nama}`} />
      </Head>

      <div style={styles.container}>
        {/* HEADER KARTU */}
        <div style={styles.cardHeader}>
          <div style={styles.headerLeft}>
            <div style={styles.logoSection}>
              <div style={styles.logo}>K</div>
              <div>
                <h1 style={styles.koperasiName}>KOPERASI DIGITAL</h1>
                <p style={styles.koperasiTagline}>Kesejahteraan Bersama</p>
              </div>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.qrCodePlaceholder}>
              <div style={styles.qrBox}>
                <div style={styles.qrInner}></div>
                <p style={styles.qrText}>QR Code</p>
              </div>
            </div>
          </div>
        </div>

        {/* PROFILE SECTION */}
        <div style={styles.profileSection}>
          <div style={styles.photoContainer}>
            <img 
              src={anggota.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(anggota.nama)}&background=3b82f6&color=fff&size=150`}
              alt={anggota.nama}
              style={styles.profilePhoto}
            />
          </div>
          
          <div style={styles.profileInfo}>
            <div style={styles.profileHeader}>
              <h2 style={styles.memberName}>{anggota.nama}</h2>
              <div style={styles.badgeContainer}>
                <span style={{
                  ...styles.statusBadge,
                  backgroundColor: anggota.status === 'AKTIF' ? '#10b981' : 
                                 anggota.status === 'NON-AKTIF' ? '#ef4444' : '#6b7280'
                }}>
                  {anggota.status}
                </span>
                <span style={styles.idBadge}>ID: {anggota.id}</span>
              </div>
            </div>
            
            <div style={styles.infoGrid}>
              <InfoItem label="Email" value={anggota.email} icon="✉️" />
              <InfoItem label="WhatsApp" value={anggota.whatsapp} icon="📱" />
              <InfoItem label="NIK" value={anggota.nik} icon="🆔" />
              <InfoItem label="Bergabung" value={formatTanggal(anggota.tanggal_bergabung)} icon="📅" />
            </div>
            
            {anggota.alamat && (
              <div style={styles.addressBox}>
                <div style={styles.addressLabel}>
                  <span>🏠</span>
                  <span style={styles.addressTitle}>Alamat</span>
                </div>
                <p style={styles.addressText}>{anggota.alamat}</p>
              </div>
            )}
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div style={styles.tabsContainer}>
          <button 
            style={{
              ...styles.tabButton,
              ...(activeTab === 'simpanan' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('simpanan')}
          >
            💰 Simpanan
          </button>
          <button 
            style={{
              ...styles.tabButton,
              ...(activeTab === 'pinjaman' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('pinjaman')}
          >
            🏦 Pinjaman
          </button>
          <button 
            style={{
              ...styles.tabButton,
              ...(activeTab === 'shu' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('shu')}
          >
            📈 SHU
          </button>
        </div>

        {/* TAB CONTENT */}
        <div style={styles.tabContent}>
          {activeTab === 'simpanan' && (
            <div style={styles.simpananSection}>
              <h3 style={styles.sectionTitle}>Detail Simpanan</h3>
              <div style={styles.simpananGrid}>
                <SimpananCard 
                  title="Simpanan Pokok" 
                  amount={anggota.simpanan_pokok} 
                  color="#3b82f6"
                />
                <SimpananCard 
                  title="Simpanan Wajib" 
                  amount={anggota.simpanan_wajib} 
                  color="#10b981"
                />
                <SimpananCard 
                  title="Simpanan Sukarela" 
                  amount={anggota.simpanan_sukarela} 
                  color="#8b5cf6"
                />
                <SimpananCard 
                  title="Total Simpanan" 
                  amount={totalSimpanan} 
                  color="#f59e0b"
                  isTotal={true}
                />
              </div>
              
              <div style={styles.tableContainer}>
                <h4 style={styles.tableTitle}>Riwayat Simpanan</h4>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Tanggal</th>
                      <th style={styles.tableHeader}>Jenis</th>
                      <th style={styles.tableHeader}>Jumlah</th>
                      <th style={styles.tableHeader}>Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.tableCell}>{formatTanggal(anggota.tanggal_bergabung)}</td>
                      <td style={styles.tableCell}>Simpanan Pokok</td>
                      <td style={styles.tableCell}>{formatRupiah(anggota.simpanan_pokok)}</td>
                      <td style={styles.tableCell}>{formatRupiah(anggota.simpanan_pokok)}</td>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>Bulan Berjalan</td>
                      <td style={styles.tableCell}>Simpanan Wajib</td>
                      <td style={styles.tableCell}>{formatRupiah(anggota.simpanan_wajib)}</td>
                      <td style={styles.tableCell}>{formatRupiah(anggota.simpanan_pokok + anggota.simpanan_wajib)}</td>
                    </tr>
                    <tr>
                      <td style={styles.tableCell}>Terakhir</td>
                      <td style={styles.tableCell}>Sukarela</td>
                      <td style={styles.tableCell}>{formatRupiah(anggota.simpanan_sukarela)}</td>
                      <td style={styles.tableCell}>{formatRupiah(totalSimpanan)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'pinjaman' && (
            <div style={styles.pinjamanSection}>
              <h3 style={styles.sectionTitle}>Detail Pinjaman</h3>
              <div style={styles.pinjamanCards}>
                <PinjamanCard 
                  title="Total Pinjaman" 
                  amount={totalPinjaman}
                  color="#ef4444"
                />
                <PinjamanCard 
                  title="Cicilan Dibayar" 
                  amount={anggota.cicilan_dibayar || 0}
                  color="#10b981"
                />
                <PinjamanCard 
                  title="Sisa Pinjaman" 
                  amount={sisaPinjaman}
                  color="#f59e0b"
                />
              </div>
              
              <div style={styles.tableContainer}>
                <h4 style={styles.tableTitle}>Riwayat Pinjaman</h4>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Tanggal</th>
                      <th style={styles.tableHeader}>Jenis Pinjaman</th>
                      <th style={styles.tableHeader}>Jumlah</th>
                      <th style={styles.tableHeader}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.tableCell}>
                        {anggota.tanggal_pinjaman ? formatTanggal(anggota.tanggal_pinjaman) : '-'}
                      </td>
                      <td style={styles.tableCell}>{anggota.jenis_pinjaman || 'Reguler'}</td>
                      <td style={styles.tableCell}>{formatRupiah(totalPinjaman)}</td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusTag,
                          backgroundColor: sisaPinjaman > 0 ? '#fef3c7' : '#d1fae5',
                          color: sisaPinjaman > 0 ? '#92400e' : '#065f46'
                        }}>
                          {sisaPinjaman > 0 ? 'Dalam Proses' : 'Lunas'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'shu' && (
            <div style={styles.shuSection}>
              <h3 style={styles.sectionTitle}>Sisa Hasil Usaha (SHU)</h3>
              <div style={styles.shuCard}>
                <div style={styles.shuCardContent}>
                  <div style={styles.shuIcon}>💵</div>
                  <div>
                    <h4 style={styles.shuTitle}>Estimasi SHU Tahun Ini</h4>
                    <p style={styles.shuAmount}>
                      {formatRupiah(anggota.shu_estimasi || 0)}
                    </p>
                    <p style={styles.shuNote}>
                      *Perhitungan berdasarkan partisipasi simpanan dan transaksi
                    </p>
                  </div>
                </div>
              </div>
              
              <div style={styles.tableContainer}>
                <h4 style={styles.tableTitle}>Pembagian SHU Tahun Lalu</h4>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Tahun</th>
                      <th style={styles.tableHeader}>Jumlah SHU</th>
                      <th style={styles.tableHeader}>Status</th>
                      <th style={styles.tableHeader}>Tgl. Pencairan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={styles.tableCell}>2023</td>
                      <td style={styles.tableCell}>{formatRupiah(anggota.shu_tahun_lalu || 0)}</td>
                      <td style={styles.tableCell}>
                        <span style={{
                          ...styles.statusTag,
                          backgroundColor: '#d1fae5',
                          color: '#065f46'
                        }}>
                          Dicairkan
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        {anggota.tgl_pencairan_shu ? formatTanggal(anggota.tgl_pencairan_shu) : 'Jan 2024'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <div style={styles.footerLeft}>
            <p style={styles.footerText}>
              <strong>KOPERASI DIGITAL</strong> • Terdaftar dan Diawasi OJK
            </p>
            <p style={styles.smallText}>
              Data diperbarui: {lastUpdate ? lastUpdate.toLocaleTimeString('id-ID') : 'Sedang memuat...'}
            </p>
          </div>
          <div style={styles.footerRight}>
            <button 
              onClick={fetchData}
              style={styles.refreshButton}
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Komponen-komponen kecil
function InfoItem({ label, value, icon }) {
  return (
    <div style={styles.infoItem}>
      <div style={styles.infoLabel}>
        <span style={styles.infoIcon}>{icon}</span>
        <span>{label}</span>
      </div>
      <div style={styles.infoValue}>{value || '-'}</div>
    </div>
  );
}

function SimpananCard({ title, amount, color, isTotal = false }) {
  return (
    <div style={{
      ...styles.simpananCard,
      borderColor: color,
      backgroundColor: isTotal ? `${color}15` : 'white'
    }}>
      <h4 style={{...styles.cardTitle, color}}>{title}</h4>
      <p style={{...styles.cardAmount, color}}>{formatRupiah(amount)}</p>
    </div>
  );
}

function PinjamanCard({ title, amount, color }) {
  return (
    <div style={{
      ...styles.pinjamanCard,
      borderColor: color
    }}>
      <h4 style={{...styles.cardTitle, color}}>{title}</h4>
      <p style={{...styles.cardAmount, color}}>{formatRupiah(amount)}</p>
    </div>
  );
}

// Format currency (ulangi di sini untuk komponen)
function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka || 0);
}

// ==================== STYLES ====================
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  
  // Loading & Error
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  errorContainer: {
    textAlign: 'center',
    padding: '50px 20px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px'
  },
  
  // Header Kartu
  cardHeader: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '25px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  logo: {
    width: '60px',
    height: '60px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: 'bold'
  },
  koperasiName: {
    margin: '0',
    color: '#1e293b',
    fontSize: '24px'
  },
  koperasiTagline: {
    margin: '5px 0 0 0',
    color: '#64748b',
    fontSize: '14px'
  },
  qrCodePlaceholder: {
    textAlign: 'center'
  },
  qrBox: {
    width: '100px',
    height: '100px',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #cbd5e1'
  },
  qrInner: {
    width: '60px',
    height: '60px',
    backgroundColor: '#334155',
    borderRadius: '5px',
    marginBottom: '5px'
  },
  qrText: {
    margin: '0',
    fontSize: '12px',
    color: '#64748b'
  },
  
  // Profile Section
  profileSection: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '20px',
    display: 'flex',
    gap: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  photoContainer: {
    flexShrink: 0
  },
  profilePhoto: {
    width: '180px',
    height: '180px',
    borderRadius: '15px',
    objectFit: 'cover',
    border: '5px solid #e2e8f0'
  },
  profileInfo: {
    flex: 1
  },
  profileHeader: {
    marginBottom: '25px'
  },
  memberName: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#1e293b'
  },
  badgeContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  statusBadge: {
    padding: '6px 15px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600'
  },
  idBadge: {
    padding: '6px 15px',
    borderRadius: '20px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontSize: '14px',
    fontWeight: '600'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '25px'
  },
  infoItem: {
    paddingBottom: '15px',
    borderBottom: '1px solid #e2e8f0'
  },
  infoLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#64748b',
    fontSize: '14px',
    marginBottom: '5px'
  },
  infoIcon: {
    fontSize: '16px'
  },
  infoValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b'
  },
  addressBox: {
    backgroundColor: '#f0f9ff',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #bae6fd'
  },
  addressLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  addressTitle: {
    fontWeight: '600',
    color: '#0369a1'
  },
  addressText: {
    margin: '0',
    color: '#1e293b',
    lineHeight: '1.5'
  },
  
  // Tabs
  tabsContainer: {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '5px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  tabButton: {
    flex: 1,
    padding: '15px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    color: '#64748b',
    borderRadius: '8px',
    transition: 'all 0.3s'
  },
  activeTab: {
    backgroundColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 2px 5px rgba(59, 130, 246, 0.3)'
  },
  
  // Tab Content
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 0 25px 0',
    color: '#1e293b',
    paddingBottom: '15px',
    borderBottom: '2px solid #e2e8f0'
  },
  
  // Simpanan
  simpananGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  simpananCard: {
    padding: '25px',
    borderRadius: '12px',
    border: '2px solid',
    textAlign: 'center',
    transition: 'transform 0.2s'
  },
  
  // Pinjaman
  pinjamanCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  pinjamanCard: {
    padding: '25px',
    borderRadius: '12px',
    border: '2px solid',
    textAlign: 'center'
  },
  
  // SHU
  shuCard: {
    backgroundColor: '#fffbeb',
    border: '2px solid #f59e0b',
    borderRadius: '12px',
    padding: '30px',
    marginBottom: '30px'
  },
  shuCardContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px'
  },
  shuIcon: {
    fontSize: '50px'
  },
  shuTitle: {
    margin: '0 0 10px 0',
    color: '#92400e',
    fontSize: '18px'
  },
  shuAmount: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#92400e',
    margin: '0 0 10px 0'
  },
  shuNote: {
    margin: '0',
    color: '#b45309',
    fontSize: '14px'
  },
  
  // Table
  tableContainer: {
    overflowX: 'auto'
  },
  tableTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 15px 0',
    color: '#374151'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    padding: '15px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#4b5563',
    borderBottom: '2px solid #e5e7eb'
  },
  tableCell: {
    padding: '15px',
    borderBottom: '1px solid #e5e7eb',
    color: '#374151'
  },
  statusTag: {
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block'
  },
  
  // Card Elements
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 15px 0'
  },
  cardAmount: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0'
  },
  
  // Footer
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  footerText: {
    margin: '0 0 10px 0',
    color: '#4b5563'
  },
  smallText: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: '0'
  },
  refreshButton: {
    padding: '10px 20px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s'
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
    
    .simpanan-card:hover {
      transform: translateY(-5px);
    }
  `;
  document.head.appendChild(style);
}
