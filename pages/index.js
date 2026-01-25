export default function Home() {
  return (
    <div style={{ 
      padding: '40px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2563eb' }}>KOPERASI DIGITAL</h1>
      <p style={{ fontSize: '18px', color: '#4b5563' }}>
        Sistem Informasi Anggota Berbasis QR Code
      </p>
      
      <div style={{
        marginTop: '40px',
        padding: '30px',
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        textAlign: 'left'
      }}>
        <h3>Contoh URL Anggota:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>
            <a href="/anggota/NIA-001" style={{ color: '#3b82f6' }}>
              🔗 https://qr-code-anggota.vercel.app/anggota/NIA-001
            </a>
          </li>
          <li style={{ margin: '10px 0' }}>
            <a href="/anggota/NIA-002" style={{ color: '#3b82f6' }}>
              🔗 https://qr-code-anggota.vercel.app/anggota/NIA-002
            </a>
          </li>
          <li style={{ margin: '10px 0' }}>
            <a href="/anggota/NIA-003" style={{ color: '#3b82f6' }}>
              🔗 https://qr-code-anggota.vercel.app/anggota/NIA-003
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
