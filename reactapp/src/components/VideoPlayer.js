import React, { useRef, useState } from 'react';
import video from '../assets/video/Infrastructure_Review_sd.mp4';
import AudioAllemand from '../assets/video/sortie_audio_allemand.mp3';

import ReactPlayer from 'react-player';

const VideoPlayer = () => {
    const audioTracks = [
        {
            kind: 'audio/mp3', // Correction ici
            label: 'Anglais',
            language: 'eng',
            src: '../assets/video/sortie_audio_anglais.aac',
        },
        {
            kind: 'audio/mp3', // Correction ici
            label: 'Allemand',
            language: 'deu',
            src: AudioAllemand,
        },
        {
            kind: 'audio/mp3', // Correction ici
            label: 'Français',
            language: 'fra',
            src: '../assets/video/sortie_audio_francais.aac',
        },
        // Ajoutez d'autres pistes audio au besoin
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(audioTracks[0]);
    const playerRef = useRef(null);

    const handleLanguageChange = (event) => {
        const selectedLanguage = audioTracks.find((track) => track.language === event.target.value);
        setSelectedLanguage(selectedLanguage);
        if (playerRef.current) {
            playerRef.current.seekTo(0);

        }
    };

    const config = {
        file: {
            attributes: {
                crossOrigin: 'anonymous',
            },
            tracks: audioTracks.map((track) => ({
                kind: track.kind,
                label: track.label,
                language: track.language,
                default: track.language === selectedLanguage.language,
                src: track.src,
            })),
        },
    };

    return (
        <div className="video-container">
            <ReactPlayer
                url={video}
                controls={true}
                config={config}
                width="100%"
                height="100%"
                ref={playerRef}
            />
            <div>
                <label>Select Language:</label>
                <select onChange={handleLanguageChange} value={selectedLanguage.language}>
                    {audioTracks.map((track) => (
                        <option key={track.language} value={track.language}>
                            {track.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default VideoPlayer;

