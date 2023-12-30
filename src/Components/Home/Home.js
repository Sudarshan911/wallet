import UserInput from "../UserInput/UserInput";
import WalletInfo from "../Wallet/Wallet";

export default function Home() {
   return localStorage.getItem('walletId') ? <WalletInfo /> : <UserInput/>
 }