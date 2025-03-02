import React, { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import hitungShalatDanAyat from "./core/function";

const suratNames = [
  "Al-Fatihah",
  "Al-Baqarah",
  "Ali 'Imran",
  "An-Nisa'",
  "Al-Ma'idah",
  "Al-An'am",
  "Al-A'raf",
  "Al-Anfal",
  "At-Taubah",
  "Yunus",
  "Hud",
  "Yusuf",
  "Ar-Ra'd",
  "Ibrahim",
  "Al-Hijr",
  "An-Nahl",
  "Al-Isra'",
  "Al-Kahf",
  "Maryam",
  "Taha",
  "Al-Anbiya'",
  "Al-Hajj",
  "Al-Mu'minun",
  "An-Nur",
  "Al-Furqan",
  "Asy-Syu'ara'",
  "An-Naml",
  "Al-Qasas",
  "Al-Ankabut",
  "Ar-Rum",
  "Luqman",
  "As-Sajdah",
  "Al-Ahzab",
  "Saba'",
  "Fatir",
  "Yasin",
  "As-Saffat",
  "Sad",
  "Az-Zumar",
  "Ghafir",
  "Fussilat",
  "Asy-Syura",
  "Az-Zukhruf",
  "Ad-Dukhan",
  "Al-Jasiyah",
  "Al-Ahqaf",
  "Muhammad",
  "Al-Fath",
  "Al-Hujurat",
  "Qaf",
  "Az-Zariyat",
  "At-Tur",
  "An-Najm",
  "Al-Qamar",
  "Ar-Rahman",
  "Al-Waqi'ah",
  "Al-Hadid",
  "Al-Mujadilah",
  "Al-Hasyr",
  "Al-Mumtahanah",
  "As-Saff",
  "Al-Jumu'ah",
  "Al-Munafiqun",
  "At-Taghabun",
  "At-Talaq",
  "At-Tahrim",
  "Al-Mulk",
  "Al-Qalam",
  "Al-Haqqah",
  "Al-Ma'arij",
  "Nuh",
  "Al-Jinn",
  "Al-Muzzammil",
  "Al-Muddaththir",
  "Al-Qiyamah",
  "Al-Insan",
  "Al-Mursalat",
  "An-Naba'",
  "An-Nazi'at",
  "'Abasa",
  "At-Takwir",
  "Al-Infitar",
  "Al-Mutaffifin",
  "Al-Insyiqaq",
  "Al-Buruj",
  "At-Tariq",
  "Al-A'la",
  "Al-Gasyiyah",
  "Al-Fajr",
  "Al-Balad",
  "Asy-Syams",
  "Al-Lail",
  "Ad-Duha",
  "Asy-Syarh",
  "At-Tin",
  "Al-'Alaq",
  "Al-Qadr",
  "Al-Bayyinah",
  "Az-Zalzalah",
  "Al-'Adiyat",
  "Al-Qari'ah",
  "At-Takasur",
  "Al-Asr",
  "Al-Humazah",
  "Al-Fil",
  "Quraisy",
  "Al-Ma'un",
  "Al-Kausar",
  "Al-Kafirun",
  "An-Nasr",
  "Al-Masad",
  "Al-Ikhlas",
  "Al-Falaq",
  "An-Nas",
];

const Watermark = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center text-gray-500 text-sm mt-10">
      Developed with love and doa by
      <a href="https://zikazama.github.io/" className="text-blue-500">
        {" "}
        Fauzi Fadhlurrohman{" "}
      </a>
      |
      <button
        onClick={() => {
          navigate("/about");
        }}
        className="text-blue-500"
      >
        {" "}
        Tentang Aplikasi
      </button>
    </div>
  );
};

const formatKota = (kota) => {
  return kota
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};

const Card = ({ children, className }) => (
  <div
    className={`bg-white shadow-lg rounded-2xl p-6 border border-gray-200 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [recommendation, setRecommendation] = useState(
    JSON.parse(localStorage.getItem("recommendation")) || null
  );
  const [kota, setKota] = useState(
    localStorage.getItem("kota") || "jakartabarat"
  );

  const resetData = () => {
    localStorage.clear();
    setUserName("");
    setRecommendation(null);
  };

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        recommendation,
        setRecommendation,
        resetData,
        kota,
        setKota,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

const StyledButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
  >
    {children}
  </button>
);

const StyledInput = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      {...props}
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const StyledSelect = ({ label, children, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <select
      {...props}
      className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  </div>
);

const Onboard = () => {
  const { userName, setUserName } = useApp();
  const navigate = useNavigate();

  const handleStart = () => {
    if (userName) {
      localStorage.setItem("userName", userName);
      navigate("/home");
    }
  };

  useEffect(() => {
    // Jika userName sudah ada, langsung redirect ke /home
    if (userName) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-green-400 p-6 text-center">
      {/* Title with shadow and modern font */}
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-wide text-shadow-md">
        Khatam Quran Tracker
      </h1>

      {/* Input field with focus effects */}
      <input
        type="text"
        placeholder="Masukkan Nama"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full max-w-xs bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 transition-all duration-300"
      />

      {/* Button with hover effect */}
      <div className="mt-6 w-full max-w-xs">
        <button
          onClick={handleStart}
          className="w-full p-4 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-md"
        >
          Lanjutkan
        </button>
      </div>

      {/* Optional tagline or footer */}
      <p className="mt-8 text-white text-sm opacity-90">
        Aplikasi untuk memantau ibadah selama Ramadhan
      </p>
      <Watermark />
    </div>
  );
};

const Home = () => {
  const { userName, recommendation, setRecommendation, resetData } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) navigate("/");
  }, [userName, navigate]);

  const handleCheckboxChange = (index) => {
    const updatedShalat = recommendation.shalat.map((item, i) => {
      if (i === index) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    if (updatedShalat[index].completed) {
      Swal.fire({
        title: "Selamat!",
        text: "Alhamdulillah 1 rekomendasi terselesaikan!",
        icon: "success",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Lanjutkan",
        timer: 2000,
      });
    }

    const newRemainAyat = updatedShalat[index].completed
      ? recommendation.remainAyat - updatedShalat[index].ayatShouldFinish
      : recommendation.remainAyat + updatedShalat[index].ayatShouldFinish;

    const updatedRecommendation = {
      ...recommendation,
      shalat: updatedShalat,
      remainAyat: newRemainAyat,
    };

    setRecommendation(updatedRecommendation);
    localStorage.setItem(
      "recommendation",
      JSON.stringify(updatedRecommendation)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <h1 className="text-4xl font-extrabold text-green-700 mb-4">
        Marhaban Ya Ramadhan, {userName}!
      </h1>
      <h2 className="text-xl font-semibold text-green-800 mb-2">
        Selamat datang di Khatam Quran Tracker
      </h2>
      <h2 className="text-md text-green-700 mb-6">
        Kelola bacaan Al-Quran Anda agar bisa khatam di bulan suci ini
      </h2>
      {!recommendation ? (
        <div className="w-64">
          <StyledButton
            onClick={() => navigate("/recommendation")}
            className="bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-lg shadow-md"
          >
            Minta Rekomendasi
          </StyledButton>
          <Watermark />
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg border border-green-300 mt-4">
          <h2 className="text-xl font-semibold text-green-800">
            Rekomendasi Bacaan
          </h2>
          <p className="mb-4 text-green-700">
            Ayat tersisa hingga khatam: {recommendation.remainAyat}
          </p>
          {recommendation.shalat.filter((item) => {
            if(item.startSurat > 114) return false;
            return true;
          }).map((item, index) => {

            return (
              <Card
                key={index}
                className="mb-4 border border-green-500 shadow-lg rounded-lg overflow-hidden"
              >
                <CardContent className="flex flex-row items-center bg-green-50 p-4 rounded-lg gap-x-4">
                  {/* Nomor urut */}
                  <div
                    className="mb-3 w-12 h-12 flex items-center justify-center bg-green-500 text-white 
              font-bold text-lg rounded-full text-center"
                  >
                    {index + 1}
                  </div>
                  {/* Informasi shalat */}
                  <div className="flex-1">
                    <p className="font-bold text-green-900 text-lg">
                      {item.date}
                    </p>
                    <p className="font-medium text-green-800">
                      {item.shalat} - {item.time}
                    </p>
                    <p className="text-green-700">
                      Ayat yang harus diselesaikan saat shalat:{" "}
                      <span className="font-semibold">
                        {item.endSurat > 114 ? 'Baca hingga khatam' : item.ayatShouldFinish}
                      </span>
                    </p>
                    <p className="text-green-700">
                      Mulai Bacaan:{" "}
                      <span className="font-semibold">
                        Surat {suratNames[item.startSurat - 1]} - Ayat{" "}
                        {item.startAyat}
                      </span>
                    </p>
                    <p className="text-green-700">
                      Selesai Bacaan:{" "}
                      <span className="font-semibold">
                        Surat {item.endSurat > 114 ? suratNames[114-1] : suratNames[item.endSurat - 1]} - Ayat{" "}
                        {item.endSurat > 114 ? 6 : item.endAyat}
                      </span>
                    </p>
                  </div>
                  {/* Checkbox */}
                  <div className="flex items-center justify-center mt-5">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleCheckboxChange(index)}
                      className="w-[50px] h-[50px] border-gray-300 rounded-lg text-green-600 focus:ring-green-500 
               checked:bg-green-500 checked:border-green-500 checked:ring-green-500"
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <div className="mt-4 text-center">
            <StyledButton
              onClick={resetData}
              className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded-lg shadow-md"
            >
              Reset Data
            </StyledButton>
          </div>
          <Watermark />
        </div>
      )}
    </div>
  );
};

const Recommendation = () => {
  const { setRecommendation, kota, setKota } = useApp();
  const navigate = useNavigate();
  const [surat, setSurat] = useState(1);
  const [ayat, setAyat] = useState(1);
  const [kotaList, setKotaList] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/kota.json"
    )
      .then((response) => response.json())
      .then((data) => setKotaList(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("kota", kota);
    const hasil = await hitungShalatDanAyat(surat, ayat, kota);
    if (hasil.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sepertinya ayat yang ditulis tidak ditemukan",
        confirmButtonColor: "#22C55E",
        confirmButtonText: "Baiklah",
        timer: 2000,
      });
      return;
    }
    console.log(hasil);
    setRecommendation(hasil.data);
    localStorage.setItem("recommendation", JSON.stringify(hasil.data));
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 p-4">
      <div className="w-full max-w-lg bg-green-50 p-8 rounded-lg shadow-lg border border-green-300">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-800">
          Pilih Surat dan Ayat sejauh mana yang telah Anda baca saat ini, lalu
          pilih kota domisili saat ini.
        </h1>
        <form>
          <StyledSelect
            label="Surat"
            value={surat}
            onChange={(e) => setSurat(parseInt(e.target.value))}
            className="text-green-800 border border-green-400"
          >
            {suratNames.map((name, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}. {name}
              </option>
            ))}
          </StyledSelect>
          <StyledInput
            label="Ayat"
            type="number"
            value={ayat}
            onChange={(e) => setAyat(parseInt(e.target.value))}
            className="text-green-800 border border-green-400"
          />
          <StyledSelect
            label="Kota"
            value={kota}
            onChange={(e) => setKota(e.target.value)}
            className="text-green-800 border border-green-400"
          >
            {kotaList.map((kota) => (
              <option key={kota} value={kota}>
                {formatKota(kota)}
              </option>
            ))}
          </StyledSelect>
          <div className="mt-6 flex justify-center">
            <StyledButton
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              onClick={handleSubmit}
            >
              Submit
            </StyledButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const About = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 p-6 text-center text-white">
    <h1 className="text-4xl font-extrabold mb-4">Tentang Aplikasi</h1>
    <p className="text-lg max-w-2xl">
      Khatam Quran Tracker adalah aplikasi yang membantu Anda dalam mengatur dan
      melacak bacaan Al-Quran selama bulan Ramadhan. Aplikasi ini dirancang
      untuk memberikan pengalaman yang nyaman dan bermanfaat bagi umat Muslim
      yang ingin mengkhatamkan Al-Quran yang dikembangan dengan sepenuh hati dan
      doa oleh Fauzi Fadhlurrohman. Aplikasi ini dibuat kurang dari 24 jam,
      terinsipirasi dan diperuntukan kepada seseorang terkasih yang sangat
      istimewa yaitu Mir'atunnisah. Alhamdulillah aplikasi ini bisa dirilis
      publik semoga dapat membantu banyak orang. Terima kasih.
    </p>
    <a href="/" className="mt-10 text-grey">
      <button>Kembali</button>
    </a>
  </div>
);

const App = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Onboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
