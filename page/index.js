export default function Home() {
  return (
    <div style={{ 
      padding: '40px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#2563eb' }}>KOPERASI DIGITAL</h1>
      <p style={{ fontSize: '18px', color: '#4b5563' }}>
        Sistem QR Code Anggota - Build Sukses! ✅
      </p>
      
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f0f9ff',
        borderRadius: '10px'
      }}>
        <h3>Test Anggota:</h3>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <a href="/anggota/NIA-001" style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            👤 Lihat Anggota NIA-001
          </a>
          
          <a href="/anggota/NIA-002" style={{
            padding: '12px 24px',
            backgroundColor: '#10b981',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            👤 Lihat Anggota NIA-002
          </a>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '15px',
        backgroundColor: '#fef3c7',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <p>✅ <strong>Build Status:</strong> SUCCESS</p>
        <p>🎯 <strong>Next Step:</strong> Integrasi Google Sheets</p>
      </div>
    </div>
  );
}
