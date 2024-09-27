import React, { useEffect, useState } from 'react';
import { exportToBlob } from '@excalidraw/excalidraw';

const SlidePreview = ({ slideData }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const generatePreview = async () => {
        if (!slideData) return;

        // Export as PNG
        const blob = await exportToBlob({
            elements: slideData,
            mimeType: 'image/png',
        });

        // Convert blob to object URL for rendering the preview
        setPreviewImage(URL.createObjectURL(blob));
    };

    useEffect(() => {
        generatePreview();
    }, [slideData]);

    if (!previewImage) return null

    return (
        <div className="h-full max-h-[100%]">
            {slideData.length ? (
                <div className="border-2 rounded h-full max-h-[100%]">
                    <img
                        src={previewImage}
                        alt="Slide Preview"
                        className="block w-full h-full object-contain"
                    />
                </div>
            ) : (
                <h1 className="text-center text-2xl font-bold">No data added</h1>
            )}
        </div>
    );
};

export default SlidePreview;
