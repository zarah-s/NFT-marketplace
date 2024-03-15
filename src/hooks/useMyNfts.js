import { ethers } from "ethers";
import erc721 from "../constants/erc721.json";
import multicallAbi from "../constants/multicall.json";
import { readOnlyProvider } from "../constants/providers";
import { useEffect, useMemo, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useMyNfts = (tokens) => {
    const { address } = useWeb3ModalAccount();
    const [data, setData] = useState([[], []]);
    const [myTokensData, setMyTokensData] = useState([])
    const tokenIDs = useMemo(
        () => [...Array.from({ length: 30 })].map((_, index) => index),
        []
    );

    useMemo(() => {
        let [_currentUserCollections, _] = data;
        const _myTokensData = _currentUserCollections.map((x) => {
            let _data = [];
            if (tokens.length) {
                _data.push({ ...tokens[x.id], id: x.id });
            }
            return _data;
        });

        // console.log(_myTokensData.flat())

        setMyTokensData(_myTokensData.flat())
    }, [data, tokens])



    useEffect(() => {
        (async () => {
            const itf = new ethers.Interface(erc721);
            const calls = tokenIDs.map((x) => ({
                target: import.meta.env.VITE_contract_address,
                callData: itf.encodeFunctionData("ownerOf", [x]),
            }));

            const multicall = new ethers.Contract(
                import.meta.env.VITE_multicall_address,
                multicallAbi,
                readOnlyProvider
            );

            const callResults = await multicall.tryAggregate.staticCall(
                false,
                calls
            );

            // const validResponsesIndex = [];
            const validResponses = callResults.map((res, index) => ({ value: res, id: index })).filter((x) => x.value[0] === true);

            const decodedResponses = validResponses.map((x) =>
                ({ ...itf.decodeFunctionResult("ownerOf", x.value[1]), id: x.id })
            );

            // console.log(decodedResponses)

            const currentUserCollections = decodedResponses.filter(ft => ft[0]?.toString().toLowerCase() === String(address).toLowerCase());
            const ownedTokens = decodedResponses.map(mp => mp);
            // console.log(currentUserCollections, ownedTokenIds)

            setData([[...currentUserCollections], [...ownedTokens]])



            // const ownedTokenIds = [];
            // const othersTokenIds = [];

            // decodedResponses.forEach((addr, index) => {
            //     if (
            //         String(addr).toLowerCase() === String(address).toLowerCase()
            //     ) {
            //         ownedTokenIds.push(validResponsesIndex[index]);
            //     } else {
            //         othersTokenIds.push(validResponsesIndex[index]);

            //     }
            // });

            // setData(ownedTokenIds);
        })();
    }, [address, tokenIDs]);

    return [data, myTokensData];
};

export default useMyNfts;
