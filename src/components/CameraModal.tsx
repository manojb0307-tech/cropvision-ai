import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, Check, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setError(null);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please check permissions or use image upload option.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      stopCamera();
      onCapture(dataUrl);
      onClose();
    }
  };

  const toggleFacingMode = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header Bar */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2 text-white">
            <Camera className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">CropVision AI Camera</span>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewfinder Box */}
        <div className="relative w-full h-[360px] bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-slate-300 space-y-3 max-w-xs">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="text-xs font-semibold">{error}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Retry Camera
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Targeting Reticle */}
              <div className="absolute inset-8 border-2 border-dashed border-emerald-400/60 rounded-2xl pointer-events-none flex items-center justify-center">
                <div className="text-[11px] font-bold text-white bg-slate-950/70 backdrop-blur-xs px-3 py-1 rounded-full border border-emerald-400/40">
                  Center Crop Leaf Inside Frame
                </div>
              </div>

              {/* Camera Switch Toggle */}
              <button
                onClick={toggleFacingMode}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 text-white border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer"
                title="Switch Camera"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-slate-950/90 border-t border-slate-800 flex items-center justify-around">
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={takeSnapshot}
            disabled={!!error || !stream}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
            title="Capture Photo"
          >
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
          </button>

          <div className="w-12" /> {/* Spacer for symmetry */}
        </div>

      </div>
    </div>
  );
};
