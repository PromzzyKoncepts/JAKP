// app/live/components/VideoPlayer.jsx
'use client';
import { forwardRef, useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = forwardRef(({ src, isLive = true }, ref) => {
  const hlsRef = useRef(null);

  const initializeHls = () => {
    if (!isLive || !ref?.current) return;

    // Clean up previous HLS instance if it exists
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    // Check if browser supports native HLS playback
    if (ref.current.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari and other browsers that support native HLS
      ref.current.src = src;
    } else if (Hls.isSupported()) {
      // For other browsers using hls.js
      const hls = new Hls();
      hlsRef.current = hls;
      
      hls.loadSource(src);
      hls.attachMedia(ref.current);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        ref.current.play().catch(e => {
          console.error('Autoplay failed:', e);
        });
      });
      
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Fatal network error encountered, trying to recover');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Fatal media error encountered, trying to recover');
              hls.recoverMediaError();
              break;
            default:
              initializeHls(); // Re-initialize HLS
              break;
          }
        }
      });
    } else {
      console.error('This browser does not support HLS streaming');
    }
  };

  useEffect(() => {
    initializeHls();

    return () => {
      // Clean up HLS instance on unmount
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src, isLive]); // Re-run when src changes

  return (
    <div className="bg-yellow-100 p-5 rounded-2xl overflow-hidden aspect-video relative">
      <video
        ref={ref}
        controls
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {isLive && (
        <div className="absolute top-8 left-8 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
          LIVE
        </div>
      )}
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;