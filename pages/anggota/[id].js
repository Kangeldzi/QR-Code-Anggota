import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AnggotaPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [anggota, setAnggota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const response = await fetch(`/api/anggota?id=${id}`);
      const data = await response.json();
      
      if (data.success) {
        setAnggota(data.data);
        setError(null);
      } else {
        setError(data.error || 'Data tidak ditemukan');
        // Gunakan data kosong sebagai fallback
        setAnggota(createEmptyData(id));
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Gagal mengambil data dari server');
      // Gunakan data kosong sebagai fallback
      setAnggota(createEmptyData(id));
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk membuat data kosong jika data tidak ditemukan
  const createEmptyData = (anggotaId) => {
    return {
      id: anggotaId,
      nama: `Anggota ${anggotaId}`,
      status: 'AKTIF',
      posisi: 'Anggota',
      alamat: '',
      jenis_kelamin: '',
      agama: '',
      nik: '',
      email: '',
      whatsapp: '',
      tanggal_bergabung: '',
      simpanan_pokok: 0,
      simpanan_wajib: 0,
      simpanan_sukarela: 0,
      total_pinjaman: 0,
      shu_estimasi: 0
    };
  };

  // Fungsi untuk memformat angka ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka || 0);
  };

  // Fungsi untuk memformat tanggal
  const formatTanggal = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Load data saat komponen dimuat atau ID berubah
  useEffect(() => {
    fetchData();
  }, [id]);

  // Fungsi untuk menghitung total simpanan
  const totalSimpanan = anggota ? 
    (anggota.simpanan_pokok || 0) + 
    (anggota.simpanan_wajib || 0) + 
    (anggota.simpanan_sukarela || 0) : 0;

  // Jika masih loading
  if (loading) {
    return (
      <>
        <Head>
          <title>Kartu Digital Anggota</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        </Head>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Memuat data anggota...</p>
          <style jsx>{`
            .loading-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background: linear-gradient(180deg,#061b12,#020b07);
              font-family: 'Poppins', sans-serif;
              color: #fff;
            }
            .spinner {
              width: 40px;
              height: 40px;
              border: 3px solid rgba(0,255,160,.3);
              border-top: 3px solid #00ff9d;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-bottom: 15px;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Kartu Digital Anggota - {anggota.nama || id}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="container">
        <div className="card">
          {/* Header dengan Logo */}
          <div className="header">
            <div className="logo-wrap">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhADAiDm28b0fescUKnqADc9uk3Q2oIptWD-hyzBQXb2AMtoPrxb7Q9Ecr9SDV_RhqA9uWO6qTcepfbfuR7KFWuKUmYYPB-6JfiExBCzT-MljhNh1P1TPsabKvh2rAQzEtZUA0lpiIkIuBxHvHVuXl0GdUWEyaABcfpsHnX_kyDLN_pS2gVNzp_kIP6Vss/s1280/1000007204.jpg" 
                alt="Logo Koperasi"
              />
            </div>
            <h1>KOPERASI ASMARA TANI</h1>
            <small>Kartu Anggota Digital (Mobile-Only)</small>
          </div>

          {/* Status Anggota */}
          <div className="status">
            <span className={anggota.status === 'AKTIF' ? 'status-active' : 'status-inactive'}>
              {anggota.status || 'AKTIF'}
            </span>
          </div>

          {/* Identitas Anggota */}
          <div className="identity">
            <h2>{anggota.nama}</h2>
            <p>NIA : {anggota.id || id}</p>
          </div>

          {/* Statistik Simpanan */}
          <div className="stats">
            <div className="stat">
              <small>Simpanan Pokok</small>
              <b>{formatRupiah(anggota.simpanan_pokok)}</b>
            </div>
            <div className="stat">
              <small>Simpanan Wajib</small>
              <b>{formatRupiah(anggota.simpanan_wajib)}</b>
            </div>
            <div className="stat">
              <small>Simpanan Sukarela</small>
              <b>{formatRupiah(anggota.simpanan_sukarela)}</b>
            </div>
          </div>

          {/* Data Detail Anggota */}
          <div className="data">
            <div><span>Alamat</span><b>{anggota.alamat || '-'}</b></div>
            <div><span>Jenis Kelamin</span><b>{anggota.jenis_kelamin || '-'}</b></div>
            <div><span>Agama</span><b>{anggota.agama || '-'}</b></div>
            <div><span>NIK</span><b>{anggota.nik || '-'}</b></div>
            <div><span>Email</span><b>{anggota.email || '-'}</b></div>
            <div><span>Telepon</span><b>{anggota.whatsapp || '-'}</b></div>
            <div><span>Tanggal Daftar</span><b>{formatTanggal(anggota.tanggal_bergabung)}</b></div>
            <div><span>Total Simpanan</span><b>{formatRupiah(totalSimpanan)}</b></div>
            <div><span>Total Pinjaman</span><b>{formatRupiah(anggota.total_pinjaman)}</b></div>
            <div><span>Estimasi SHU</span><b>{formatRupiah(anggota.shu_estimasi)}</b></div>
          </div>

          {/* Action Buttons */}
          <div className="actions">
            <button onClick={() => window.print()}>Cetak</button>
            <button onClick={() => alert('Fitur Export PDF akan datang!')}>Export PDF</button>
          </div>

          {/* Footer */}
          <div className="footer">
            Data tersinkronisasi dari Dashboard Admin<br />
            © Koperasi Asmara Tani {new Date().getFullYear()}
            <div className="last-update">
              Terakhir update: {new Date().toLocaleTimeString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Container Utama */
        .container {
          margin: 0;
          background: linear-gradient(180deg,#061b12,#020b07);
          font-family: 'Poppins', sans-serif;
          display: flex;
          justify-content: center;
          padding: 16px;
          color: #fff;
          min-height: 100vh;
        }

        /* KARTU */
        .card {
          width: 100%;
          max-width: 390px;
          background: linear-gradient(160deg,#0f3d28,#062015);
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 0 35px rgba(0,255,160,.35);
          border: 1px solid rgba(0,255,160,.35);
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* HEADER */
        .header {
          text-align: center;
          border-bottom: 1px dashed rgba(255,255,255,.25);
          padding-bottom: 14px;
        }

        /* LOGO GLASS */
        .logo-wrap {
          width: 86px;
          height: 86px;
          margin: 0 auto 10px;
          border-radius: 50%;
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 18px rgba(0,255,160,.6),
            inset 0 0 12px rgba(255,255,255,.25);
          transition: .4s ease;
          animation: float 4s ease-in-out infinite;
        }
        
        .logo-wrap:hover {
          transform: scale(1.08);
          box-shadow: 0 0 28px rgba(0,255,160,.9);
        }
        
        .logo-wrap img {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          object-fit: cover;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .header h1 {
          font-size: 16px;
          margin: 0;
          font-weight: 700;
          color: #7dffb2;
        }
        
        .header small {
          font-size: 11px;
          opacity: .85;
        }

        /* STATUS */
        .status {
          margin: 12px auto;
          text-align: center;
        }
        
        .status span {
          padding: 6px 18px;
          border-radius: 20px;
          background: #00ff9d33;
          color: #00ff9d;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }
        
        .status-inactive {
          background: #ff3d0033 !important;
          color: #ffa000 !important;
        }

        /* IDENTITAS */
        .identity {
          text-align: center;
          margin: 14px 0;
        }
        
        .identity h2 {
          margin: 4px 0;
          font-size: 17px;
          color: #fff;
        }
        
        .identity p {
          margin: 0;
          font-size: 12px;
          color: #a9ffd1;
        }

        /* STATS */
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin: 16px 0;
        }
        
        .stat {
          background: rgba(0,255,160,.15);
          border-radius: 14px;
          padding: 10px;
          text-align: center;
        }
        
        .stat small {
          font-size: 10px;
          opacity: .9;
          display: block;
          color: #b6ffd9;
        }
        
        .stat b {
          display: block;
          margin-top: 6px;
          font-size: 13px;
          color: #00ff9d;
        }

        /* DATA */
        .data {
          font-size: 12px;
          margin-top: 20px;
        }
        
        .data div {
          display: flex;
          justify-content: space-between;
          padding: 7px 0;
          border-bottom: 1px dashed rgba(255,255,255,.25);
        }
        
        .data span {
          color: #b6ffd9;
        }
        
        .data b {
          color: #fff;
          font-weight: 600;
          text-align: right;
          max-width: 60%;
          word-break: break-word;
        }

        /* ACTION BUTTON */
        .actions {
          display: flex;
          gap: 12px;
          margin: 18px 0 6px;
        }
        
        .actions button {
          flex: 1;
          border: none;
          padding: 10px;
          border-radius: 14px;
          background: rgba(0,255,160,.2);
          color: #00ff9d;
          font-weight: 600;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 14px rgba(0,255,160,.5);
          transition: .3s;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
        }
        
        .actions button:hover {
          background: #00ff9d;
          color: #003a24;
          transform: translateY(-2px);
        }

        /* FOOTER */
        .footer {
          margin-top: 10px;
          text-align: center;
          font-size: 10px;
          opacity: .75;
          color: #a9ffd1;
        }

        /* LAST UPDATE */
        .last-update {
          font-size: 9px;
          text-align: center;
          margin-top: 5px;
          opacity: .6;
          color: #7dffb2;
        }

        /* Responsive adjustments */
        @media (max-width: 400px) {
          .container {
            padding: 10px;
          }
          
          .card {
            padding: 15px;
          }
          
          .stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }
          
          .data div {
            flex-direction: column;
          }
          
          .data b {
            text-align: left;
            margin-top: 2px;
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
