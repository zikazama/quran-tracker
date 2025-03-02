const formatDate = (months, date) => {
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  return formattedDate;
};

export default async function hitungShalatDanAyat(
  suratSaatIni,
  ayatSaatIni,
  kotaSaatIni
) {
  const jumlahAyatPerSurat = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128,
    111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73,
    54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49,
    62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28,
    28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20,
    15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5,
    6,
  ];

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const totalAyat = 6236;
  const sekarang = new Date();
  const tanggalIdulFitri = new Date("2025-03-31T00:00:00");

  // **Validasi jika surat yang dimasukkan valid**
  if (suratSaatIni < 1 || suratSaatIni > jumlahAyatPerSurat.length) {
    return { error: "Nomor surat tidak valid." };
  }

  // **Validasi jika ayat tersebut ada dalam surat yang dimaksud**
  const jumlahAyatDalamSurat = jumlahAyatPerSurat[suratSaatIni - 1];
  if (ayatSaatIni < 1 || ayatSaatIni > jumlahAyatDalamSurat) {
    return { error: `Ayat ${ayatSaatIni} tidak ada dalam surat ke-${suratSaatIni}, surat ini hanya memiliki ${jumlahAyatDalamSurat} ayat.` };
  }

  let ayatTerbaca = jumlahAyatPerSurat.slice(0, suratSaatIni - 1).reduce((acc, val) => acc + val, 0) + ayatSaatIni - 1;
  const sisaAyat = totalAyat - ayatTerbaca;

  const satuHari = 24 * 60 * 60 * 1000;
  const malamTakbiran = new Date(tanggalIdulFitri.getTime() - satuHari);
  const hariTersisa = Math.ceil((malamTakbiran - sekarang) / satuHari);

  const shalatPerHari = 5;
  const totalShalatTersisa = hariTersisa * shalatPerHari;
  const ayatPerShalat = Math.ceil(sisaAyat / totalShalatTersisa);

  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${kotaSaatIni.toLowerCase()}/2024/03.json`
    );
    const jadwal = await response.json();
    const jadwalHariIni = jadwal[0];

    if (!jadwalHariIni) {
      throw new Error("Jadwal shalat tidak ditemukan untuk kota tersebut.");
    }

    const waktuShalat = [
      { nama: "Subuh", waktu: jadwalHariIni.shubuh },
      { nama: "Dzuhur", waktu: jadwalHariIni.dzuhur },
      { nama: "Ashar", waktu: jadwalHariIni.ashr },
      { nama: "Maghrib", waktu: jadwalHariIni.magrib },
      { nama: "Isya", waktu: jadwalHariIni.isya },
    ];

    const jadwalShalat = [];
    let tanggalShalat = new Date(sekarang);
    tanggalShalat.setHours(0, 0, 0, 0);

    for (let i = 0; i < hariTersisa; i++) {
      waktuShalat.forEach((shalat) => {
        let startSurat = suratSaatIni;
        let startAyat = ayatSaatIni;
        let endSurat = startSurat;
        let endAyat = startAyat + ayatPerShalat - 1;
        
        while (endAyat > jumlahAyatPerSurat[endSurat - 1]) {
          endAyat -= jumlahAyatPerSurat[endSurat - 1];
          endSurat++;
        }

        jadwalShalat.push({
          id: jadwalShalat.length + 1,
          date: formatDate(months, tanggalShalat),
          time: shalat.waktu,
          shalat: shalat.nama,
          ayatShouldFinish: ayatPerShalat,
          startSurat,
          startAyat,
          endSurat,
          endAyat,
        });

        suratSaatIni = endSurat;
        ayatSaatIni = endAyat + 1;
        if (ayatSaatIni > jumlahAyatPerSurat[suratSaatIni - 1]) {
          suratSaatIni++;
          ayatSaatIni = 1;
        }
      });
      tanggalShalat.setDate(tanggalShalat.getDate() + 1);
    }

    return {
      data: {
        remainAyat: sisaAyat,
        city: kotaSaatIni,
        shalat: jadwalShalat,
      },
    };
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return { error: "Gagal mengambil data jadwal shalat." };
  }
}
