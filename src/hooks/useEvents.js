import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

const useEvents = () => {
    const [value, setValue] = useState(0);

    const eventListerner = useCallback((log) => {
        setValue((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const filter = {
            address: import.meta.env.VITE_contract_address,
            topics: [
                ethers.id("Transfer(address,address,uint256)")
            ],
        };

        const wssProvider2 = new ethers.WebSocketProvider(
            import.meta.env.VITE_wss_rpc_url
        );
        wssProvider2.on(filter, eventListerner);
        return () => wssProvider2.off(filter, eventListerner);
    }, [eventListerner]);

    return value;
};

export default useEvents;