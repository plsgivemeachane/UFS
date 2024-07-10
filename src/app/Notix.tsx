import { useEffect } from 'react';

const Notix = () => {
    useEffect(() => {
        const s = document.createElement('script');
        s.src = 'https://notix.io/ent/current/enot.min.js';
        s.onload = function () {
        (window as any).sdk.startInstall({
            appId: '100632aa56534abe2d99949f41ac22e',
            loadSettings: true,
        });
        };
        document.head.append(s);
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default Notix;
