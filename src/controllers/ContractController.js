import { isAddress } from "ethers";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getContract } from "../constants/contracts";
import { toast } from "react-toastify";
import { ethers } from "ethers";

export class Controller {
    chainId = null;
    walletProvider = null;
    loading = false;


    constructor(_chainId, _walletProvider) {
        this.chainId = _chainId
        this.walletProvider = _walletProvider
    }



    handleMint = async (tokenId) => {
        if (this.loading) return;
        if (!isSupportedChain(this.chainId)) return toast.error("Wrong network");
        this.loading = true;
        const toastId = toast.loading("Processing");
        const readWriteProvider = getProvider(this.walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getContract(signer);
        try {
            const transaction = await contract.safeMint(signer.address, tokenId, { value: ethers.parseUnits("1", 16) });
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();
            console.log("receipt: ", receipt);
            toast.dismiss(toastId)
            if (receipt.status) {
                toast.success("Transfer successfull!", { autoClose: 3000 })
                this.loading = false;
                return;
            }
            toast.error("Transfer failed!", { autoClose: 3000 })
            this.loading = false;
        } catch (error) {
            toast.dismiss(toastId)
            console.log(error)
            toast.error(error?.reason ?? "An unknown error occured", { autoClose: 3000 })
            this.loading = false;
        }
    };



    handleTransfer = async (tokenId, receiver) => {
        if (this.loading) return;
        if (!isSupportedChain(this.chainId)) return toast.error("Wrong network");
        if (!isAddress(receiver)) return toast.error("Invalid address");
        this.loading = true;
        const toastId = toast.loading("Processing");
        const readWriteProvider = getProvider(this.walletProvider);
        const signer = await readWriteProvider.getSigner();
        const contract = getContract(signer);
        try {
            const transaction = await contract.safeTransferFrom(signer.address, receiver, tokenId);
            console.log("transaction: ", transaction);
            const receipt = await transaction.wait();
            console.log("receipt: ", receipt);
            toast.dismiss(toastId)
            if (receipt.status) {
                toast.success("Transfer successfull!", { autoClose: 3000 })
                this.loading = false;
                return;
            }
            toast.error("Transfer failed!", { autoClose: 3000 })
            this.loading = false;
        } catch (error) {
            toast.dismiss(toastId)
            toast.error(error?.reason ?? "An unknown error occured", { autoClose: 3000 })
            this.loading = false;
        }
    };
}

