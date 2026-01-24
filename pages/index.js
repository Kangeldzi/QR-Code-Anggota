import { useState, useEffect } from 'react';

export default function Home() {
  const [anggotaCount, setAnggotaCount] = useState(0);
  
  useEffect(() => {
    // Simulasi jumlah anggota
    setAnggotaCount(150);
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>KOPERASI DIGITAL</h1>
        <p style={styles.subtitle}>Sistem Informasi Anggota Berbasis QR Code</p>
      </header>

      <main style={styles.main}>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3>Total Anggota</h3>
            <p style={styles.statNumber}>{anggotaCount}</p>
          </div>
          <div style={styles.statCard}>
            <h3>Status Sistem</h3>
            <p style={{...styles.statNumber, color: '#10b981'}}>AKTIF</p>
          </div>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.infoTitle}>Cara Mengakses Data Anggota</h2>
          
          <div style={styles.urlFormat}>
            <h3>Format URL:</h3>
            <code style={styles.codeBlock}>
              https://qr-code-anggota.vercel.app/anggota/[ID-ANGGOTA]
            </code>
          </div>

          <div style={styles.examples}>
            <h3>Contoh:</h3>
            <ul style={styles.exampleList}>
              <li>
                <a href="/anggota/NIA-001" style={styles.link}>
                  👤 Eldi Sugianto - NIA-001
                </a>
              </li>
              <li>
                <a href="/anggota/NIA-002" style={styles.link}>
                  👤 Siti Rahayu - NIA-002
                </a>
              </li>
              <li>
                <a href="/anggota/NIA-003" style={styles.link}>
                  👤 Agus Wijaya - NIA-003
                </a>
              </li>
              <li>
                <a href="/anggota/NIA-004" style={styles.link}>
                  👤 Rina Dewi - NIA-004
                </a>
              </li>
            </ul>
          </div>

          <div style={styles.instruction}>
            <h3>📱 Untuk Anggota:</h3>
            <p>Scan QR Code di kartu anggota Anda untuk melihat data pribadi</p>
            
            <h3>👨‍💼 Untuk Admin:</h3>
            <p>Update data di Google Sheets, perubahan langsung terlihat</p>
          </div>
        </div>

        <div style={styles.quickTest}>
          <h3>Coba Sekarang:</h3>
          <div style={styles.testInput}>
            <input 
              type="text" 
              placeholder="Masukkan ID (contoh: NIA-001)" 
              id="testId"
              style={styles.input}
            />
            <button 
              onClick={() => {
                const id = document.getElementById('testId').value;
                if (id) window.location.href = `/anggota/${id}`;
              }}
              style={styles.button}
            >
              Lihat Data
            </button>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Koperasi Digital. All rights reserved.</p>
        <p style={styles.contact}>
          📞 Hubungi Admin: 0812-3456-7890 | 
          📧 admin@koperasi-digital.com
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Arial, sans-serif',
    backgroundColor: '#f8fafc'
  },
  header: {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    borderRadius: '0 0 20px 20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 10px 0',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: '0.9',
    margin: '0'
  },
  main: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '0 20px'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e40af',
    margin: '10px 0 0 0'
  },
  infoBox: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px'
  },
  infoTitle: {
    color: '#1e293b',
    marginTop: '0',
    borderBottom: '2px solid #e2e8f0',
    paddingBottom: '15px'
  },
  urlFormat: {
    margin: '25px 0'
  },
  codeBlock: {
    display: 'block',
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '15px',
    borderRadius: '8px',
    margin: '10px 0',
    fontSize: '16px',
    overflowX: 'auto',
    fontFamily: 'monospace'
  },
  examples: {
    margin: '30px 0'
  },
  exampleList: {
    listStyle: 'none',
    padding: '0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  link: {
    display: 'block',
    padding: '15px',
    backgroundColor: '#f0f9ff',
    color: '#0369a1',
    textDecoration: 'none',
    borderRadius: '8px',
    border: '1px solid #bae6fd',
    transition: 'all 0.3s'
  },
  instruction: {
    backgroundColor: '#f0f9ff',
    padding: '20px',
    borderRadius: '10px',
    margin: '25px 0'
  },
  quickTest: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  testInput: {
    display: 'flex',
    gap: '10px',
    maxWidth: '500px',
    margin: '20px auto'
  },
  input: {
    flex: '1',
    padding: '12px 15px',
    border: '2px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px'
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600'
  },
  footer: {
    textAlign: 'center',
    padding: '30px 20px',
    color: '#6b7280',
    borderTop: '1px solid #e5e7eb',
    marginTop: '50px',
    backgroundColor: 'white'
  },
  contact: {
    marginTop: '10px',
    fontSize: '14px'
  }
};
