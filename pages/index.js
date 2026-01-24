export default function Home() {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
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
        <h3>Format URL Anggota:</h3>
        <code style={{
          display: 'block',
          backgroundColor: '#1f2937',
          color: 'white',
          padding: '15px',
          borderRadius: '5px',
          margin: '15px 0',
          fontSize: '14px',
          overflowX: 'auto'
        }}>
          https://qr-code-anggota.vercel.app/anggota/[ID-ANGGOTA]
        </code>
        
        <p><strong>Contoh:</strong></p>
        <ul>
          <li>
            <a href="/anggota/NIA-001" style={{ color: '#3b82f6' }}>
              https://qr-code-anggota.vercel.app/anggota/NIA-001
            </a>
          </li>
          <li>
            <a href="/anggota/NIA-002" style={{ color: '#3b82f6' }}>
              https://qr-code-anggota.vercel.app/anggota/NIA-002
            </a>
          </li>
          <li>
            <a href="/anggota/NIA-003" style={{ color: '#3b82f6' }}>
              https://qr-code-anggota.vercel.app/anggota/NIA-003
            </a>
          </li>
        </ul>
      </div>
      
      <div style={{ marginTop: '40px', color: '#6b7280', fontSize: '14px' }}>
        <p>Hubungi admin untuk QR Code pribadi Anda</p>
      </div>
    </div>
  );
}
