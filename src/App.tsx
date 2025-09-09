import React, { useState, useRef } from "react";
import eah from "./assets/Eah.png";
import softspot from "./assets/softspot.mp3"; // ✅ place Soft Spot (keshi) MP3 here

const GetWellBook: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = () => {
    if (!opened) {
      setOpened(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          console.log("Autoplay blocked — user interaction required.");
        });
      }
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Great+Vibes&display=swap');
        
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #4b0082, #8a2be2, #dda0dd);
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .book-container {
          perspective: 2000px;
          width: clamp(220px, 30vw, 400px);
          height: clamp(380px, 80vh, 700px); /* taller rectangle */
          cursor: pointer;
          position: relative;
        }
        .book {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }
        .page, .cover, .message-page {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          transform-origin: left center;
          border-radius: 6px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .cover {
          background: #4b0082;
          background-image: radial-gradient(circle at top left, #6a0dad, #4b0082 70%);
          border: 4px solid gold;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          font-family: 'Cinzel Decorative', cursive;
          padding: 5% 8%;
          z-index: 5;
        }
        .cover::before {
          content: "";
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          border: 2px solid gold;
          pointer-events: none;
        }
        .cover .title {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: gold;
          font-size: clamp(16px, 4vw, 32px);
          font-weight: 900;
          text-align: center;
          line-height: 1.3;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .cover .title div {
          display: block;
        }
        .cover .author {
          color: gold;
          font-size: clamp(10px, 2vw, 18px);
          font-weight: bold;
          text-transform: uppercase;
          margin-top: 10px;
        }
        .page {
          background: #d8b9f2;
        }
        .page1 { z-index: 4; }
        .page2 { z-index: 3; }

        .message-page {
          background: url(${eah}) center center / cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
          z-index: 1;
          transform: rotateY(180deg); /* hidden at first */
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
        }
        .message-text {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(24px, 3.2vw, 36px);
          font-weight: 700;
          background: linear-gradient(45deg, #a020f0, #da70d6, #dda0dd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
          opacity: 0;
          z-index: 2;
          position: relative;
          line-height: 1.5;
          letter-spacing: 2px;
        }

        /* Animations */
        .book.opened .cover {
          animation: coverFlip 1s forwards;
        }
        .book.opened .page1 {
          animation: pageFlip 1s 0.3s forwards;
        }
        .book.opened .page2 {
          animation: pageFlip 1s 0.6s forwards;
        }
        .book.opened .message-page {
          animation: messageFlip 1s 1s forwards;
        }
        .book.opened .message-text {
          animation: fadeIn 1s 2s forwards;
        }
        @keyframes coverFlip {
          to { transform: rotateY(-180deg); }
        }
        @keyframes pageFlip {
          to { transform: rotateY(-180deg); }
        }
        @keyframes messageFlip {
          to { transform: rotateY(0deg); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>

      <div className="book-container" onClick={handleClick}>
        <div className={`book ${opened ? "opened" : ""}`}>
          <div className="cover">
            <div className="title">
              <div>Healing</div>
              <div>Wishes</div>
              <div>From</div>
              <div>My</div>
              <div>Heart</div>
            </div>
            <div className="author">Duane Villapando</div>
          </div>
          <div className="page page1"></div>
          <div className="page page2"></div>
          <div className="message-page">
            <div className="message-text">
              Wishing you a<br />speedy recovery 💜<br />
              Please rest well 🌸<br /><br />
              I miss you 💖
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Hidden audio player */}
      <audio ref={audioRef} src={softspot} preload="auto" />
    </div>
  );
};

export default GetWellBook;
