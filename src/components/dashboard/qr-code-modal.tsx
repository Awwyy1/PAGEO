// QR Code modal — generates and displays a downloadable QR code for the user's page
"use client";

import { useState } from "react";
import { QrCode, Download, X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QrCodeModalProps {
  username: string;
}

export function QrCodeButton({ username }: QrCodeModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <QrCode className="h-4 w-4" />
        QR Code
      </button>

      {open && <QrCodeModal username={username} onClose={() => setOpen(false)} />}
    </>
  );
}

function QrCodeModal({
  username,
  onClose,
}: {
  username: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const pageUrl = `https://allme.site/${username}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(pageUrl)}&bgcolor=ffffff&color=000000&format=svg`;

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    try {
      const pngUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${encodeURIComponent(pageUrl)}&bgcolor=ffffff&color=000000&format=png`;
      const response = await fetch(pngUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `allme-${username}-qr.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(qrImageUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-5">
          <div>
            <h3 className="text-lg font-bold">Your QR Code</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Scan to visit your allme page
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-5 shadow-inner">
              <img
                src={qrImageUrl}
                alt={`QR code for ${pageUrl}`}
                width={200}
                height={200}
                className="w-[200px] h-[200px]"
              />
            </div>
          </div>

          {/* URL */}
          <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-2.5">
            <span className="text-sm text-muted-foreground truncate flex-1">
              {pageUrl}
            </span>
            <button
              onClick={handleCopyUrl}
              className={cn(
                "shrink-0 text-muted-foreground hover:text-foreground transition-colors",
                copied && "text-emerald-500"
              )}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Download button */}
          <Button onClick={handleDownload} className="w-full gap-2">
            <Download className="h-4 w-4" />
            Download QR Code
          </Button>
        </div>
      </div>
    </div>
  );
}
