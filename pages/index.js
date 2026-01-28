// pages/index.js - Homepage baru
export default function Home() {
    return (
        <div style={{
            padding: '40px',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <h1>QR Code System - Koperasi Digital</h1>
            <p>Selamat datang di sistem QR Code anggota koperasi</p>
            
            <div style={{
                marginTop: '40px',
                padding: '20px',
                background: '#f0f9ff',
                borderRadius: '10px'
            }}>
                <h3>Cara Akses Data Anggota:</h3>
                <p>Gunakan format URL:</p>
                <code style={{
                    display: 'block',
                    background: '#1e40af',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    margin: '10px 0',
                    fontSize: '14px'
                }}>
                    https://qr-code-anggota.vercel.app/anggota/[ID-ANGGOTA]
                </code>
                
                <p>Contoh:</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center'
                }}>
                    <a href="/anggota/NIA-001" style={{
                        padding: '10px 20px',
                        background: '#3b82f6',
                        color: 'white',
                        borderRadius: '5px',
                        textDecoration: 'none'
                    }}>
                        Contoh: Anggota NIA-001
                    </a>
                    
                    <a href="/anggota/NIA-002" style={{
                        padding: '10px 20px',
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '5px',
                        textDecoration: 'none'
                    }}>
                        Contoh: Anggota NIA-002
                    </a>
                </div>
            </div>
            
            <div style={{ marginTop: '40px', fontSize: '14px', color: '#6b7280' }}>
                <p>📞 Untuk bantuan: hubungi admin koperasi</p>
            </div>
        </div>
    );
}
