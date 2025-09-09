import { useEffect, useState } from "react";

// ✅ Reusable hook
export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const updateStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        return () => {
            window.removeEventListener("online", updateStatus);
            window.removeEventListener("offline", updateStatus);
        };
    }, []);

    return isOnline;
}