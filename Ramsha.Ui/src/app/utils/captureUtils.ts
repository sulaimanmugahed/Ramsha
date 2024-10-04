import html2canvas from 'html2canvas';
import { createRoot } from 'react-dom/client';

export const captureComponentAsImage = async (component: React.ReactNode): Promise<string> => {
    return new Promise((resolve, reject) => {
        const headerContainer = document.createElement('div');
        headerContainer.style.position = 'fixed';
        headerContainer.style.top = '-9999px';
        document.body.appendChild(headerContainer);

        const root = createRoot(headerContainer);
        root.render(component);

        setTimeout(async () => {
            try {
                const headerCanvas = await html2canvas(headerContainer, { useCORS: true, scale: 4 });
                const headerImgData = headerCanvas.toDataURL('image/png');
                root.unmount();
                document.body.removeChild(headerContainer);
                resolve(headerImgData);
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
}
