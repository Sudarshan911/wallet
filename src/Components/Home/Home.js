import WalletInputForm from "../WalletInputForm/WalletInputForm";
import WalletInfo from "../Wallet/Wallet";

export default function Home() {
   return localStorage.getItem('walletId') ? <WalletInfo /> : <WalletInputForm/>
 }