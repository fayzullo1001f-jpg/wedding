import React, { useEffect, useState, useRef } from "react";
import "./App.css";

import teleg from "./img/telegram-brands-solid-full.svg";
import instagram from "./img/instagram-brands-solid-full.svg";
import face from "./img/facebook-brands-solid-full.svg";
import musicFile from "./music/music_for_videos-wedding-march-music-box-163683 (1).mp3";

function App() {
    const [timeLeft, setTimeLeft] = useState("");
    const [showMap, setShowMap] = useState(false);
    const [musicStarted, setMusicStarted] = useState(false);

    const audioRef = useRef(null);
    const sectionsRef = useRef([]);

    const weddingDate = new Date(2026, 4, 1, 18, 0, 0).getTime();

    const startMusic = async () => {
        const audio = audioRef.current;
        if (!audio || musicStarted) return;

        try {
            await audio.play();
            setMusicStarted(true);
        } catch (err) {
            console.log("Music blocked");
        }
    };

    useEffect(() => {
        const handleStart = () => startMusic();

        window.addEventListener("click", handleStart);
        window.addEventListener("scroll", handleStart);

        return () => {
            window.removeEventListener("click", handleStart);
            window.removeEventListener("scroll", handleStart);
        };
    }, [musicStarted]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                setTimeLeft("Tadbir boshlandi 🎉");
                clearInterval(interval);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((distance / (1000 * 60)) % 60);
                const seconds = Math.floor((distance / 1000) % 60);

                setTimeLeft(
                    `${days} kun ${hours} soat ${minutes} daqiqa ${seconds} sekund`
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");

                        if (entry.target.dataset.index === "1") {
                            setShowMap(true);
                        }
                    }
                });
            },
            { threshold: 0.3 }
        );

        sectionsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* HEADER */}
            <header className="header">
                <div className="intro">
                    <h1 className="name_wed">WEDDING DAY</h1>
                    <h1 className="name_men">SHAXZOD</h1>
                    <h1 className="class_name">&</h1>
                    <h1 className="name_woman">MARJONA</h1>
                    <h1 className="name_date">01.05.2026</h1>

                    <audio ref={audioRef} loop>
                        <source src={musicFile} type="audio/mp3" />
                    </audio>
                </div>
            </header>

            {/* SECTION 1 */}
            <section className="section section1">
                <div className="container hidden" data-index="0" ref={(el) => (sectionsRef.current[0] = el)}>
                    <h2>💍 TO'Y TAKLIFNOMASI</h2>

                    <p>
                        Assalomu alaykum! Hurmatli va aziz mehmonimiz 💖<br /><br />
                        Sizni hayotimizning eng baxtli kunlaridan biri — farzandlarimizning
                        nikoh to‘y marosimiga chin qalbimizdan taklif etamiz.<br /><br />
                        Sizning ishtirokingiz ushbu quvonchli kunimizni yanada yorqin va unutilmas qiladi.
                        Birga quvonch ulashishni intiqlik bilan kutamiz ✨
                    </p>

                    <h3 className="timer">⏳ {timeLeft}</h3>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="section section2">
                <div className="container hidden" data-index="1" ref={(el) => (sectionsRef.current[1] = el)}>
                    <h2>📍 Manzil</h2>

                    {showMap && (
                        <iframe
                            title="map"
                            src="https://www.google.com/maps?q=Grand%20Hall%20Tashkent&output=embed"
                            width="100%"
                            height="300"
                        />
                    )}
                </div>
            </section>

            {/* SECTION 4 (bo‘sh qoldirildi) */}
            <section className="section section4"></section>

            {/* SECTION 3 */}
            <section className="section section3">
                <div className="container hidden" data-index="2" ref={(el) => (sectionsRef.current[2] = el)}>
                    <h2>❤️ Sizni kutamiz</h2>
                    <h2>Murojat: +998-99-123-45-67</h2>
                    <h2>Manzil: Grand Hall restaurant</h2>
                    <h2>Mo'ljal: Yunusobod 13</h2>

                    <img className="teleg" src={teleg} alt="" />
                    <img className="ins" src={instagram} alt="" />
                    <img className="ins" src={face} alt="" />
                </div>
            </section>
        </>
    );
}

export default App;