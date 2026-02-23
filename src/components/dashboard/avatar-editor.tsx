// Avatar editor modal — crop, zoom, and pan before uploading
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ZoomIn, ZoomOut, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AvatarEditorProps {
    file: File;
    onSave: (croppedBlob: Blob) => void;
    onCancel: () => void;
}

export function AvatarEditor({ file, onSave, onCancel }: AvatarEditorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [saving, setSaving] = useState(false);

    const CANVAS_SIZE = 240;

    // Load image from file
    useEffect(() => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            setImage(img);
            // Reset position
            setZoom(1);
            setOffset({ x: 0, y: 0 });
        };
        img.src = url;
        return () => URL.revokeObjectURL(url);
    }, [file]);

    // Draw image on canvas
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || !image) return;

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Calculate scaled dimensions (fit image to canvas, then apply zoom)
        const scale = Math.max(CANVAS_SIZE / image.width, CANVAS_SIZE / image.height) * zoom;
        const w = image.width * scale;
        const h = image.height * scale;
        const x = (CANVAS_SIZE - w) / 2 + offset.x;
        const y = (CANVAS_SIZE - h) / 2 + offset.y;

        // Clip to circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2);
        ctx.clip();

        ctx.drawImage(image, x, y, w, h);
        ctx.restore();
    }, [image, zoom, offset]);

    useEffect(() => {
        draw();
    }, [draw]);

    // Mouse/touch drag handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        setDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragging) return;
        setOffset({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    const handlePointerUp = () => {
        setDragging(false);
    };

    const handleZoomChange = (newZoom: number) => {
        setZoom(Math.max(0.5, Math.min(3, newZoom)));
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        setSaving(true);

        // Draw final high-res version (512×512)
        const exportCanvas = document.createElement("canvas");
        exportCanvas.width = 512;
        exportCanvas.height = 512;
        const ctx = exportCanvas.getContext("2d");
        if (!ctx || !image) return;

        const scale = Math.max(512 / image.width, 512 / image.height) * zoom;
        const w = image.width * scale;
        const h = image.height * scale;
        const ratio = 512 / CANVAS_SIZE;
        const x = (512 - w) / 2 + offset.x * ratio;
        const y = (512 - h) / 2 + offset.y * ratio;

        ctx.beginPath();
        ctx.arc(256, 256, 256, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(image, x, y, w, h);

        exportCanvas.toBlob(
            (blob) => {
                if (blob) onSave(blob);
                setSaving(false);
            },
            "image/png",
            1
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-card border rounded-2xl p-6 w-full max-w-sm space-y-5 shadow-2xl">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Adjust photo</h3>
                    <button
                        onClick={onCancel}
                        className="p-1 rounded-lg hover:bg-accent transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Canvas — circular crop preview */}
                <div className="flex justify-center">
                    <div
                        ref={containerRef}
                        className="relative cursor-grab active:cursor-grabbing rounded-full overflow-hidden border-2 border-border shadow-lg"
                        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
                    >
                        <canvas
                            ref={canvasRef}
                            width={CANVAS_SIZE}
                            height={CANVAS_SIZE}
                            onPointerDown={handlePointerDown}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            className="touch-none"
                        />
                    </div>
                </div>

                {/* Zoom slider */}
                <div className="flex items-center gap-3 px-2">
                    <button
                        onClick={() => handleZoomChange(zoom - 0.1)}
                        className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                    >
                        <ZoomOut className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.05"
                        value={zoom}
                        onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                        className="flex-1 accent-primary h-1.5"
                    />
                    <button
                        onClick={() => handleZoomChange(zoom + 0.1)}
                        className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                    >
                        <ZoomIn className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                    Drag to reposition · Scroll to zoom
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button
                        onClick={handleSave}
                        className="flex-1"
                        disabled={saving}
                    >
                        <Check className="h-4 w-4 mr-1.5" />
                        {saving ? "Saving..." : "Apply"}
                    </Button>
                    <Button variant="outline" onClick={onCancel} className="flex-1">
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}
