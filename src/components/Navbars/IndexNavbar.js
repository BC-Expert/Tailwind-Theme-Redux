/*eslint-disable*/
import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faThList,faWallet } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { inputAddr,setBalance } from '../../features/walletSlice'
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const dispatch = useDispatch();
  const address = useSelector((state) => state.walletInfo.walletAddr);
  const balance = useSelector((state)=> state.walletInfo.balance);


  useEffect(()=>{
    //Check the metamask installed.
    connectWallet();
    console.log("address",address)
  },
  [])

  async function balanceFromWallet(addr) {
    console.log("add",addr)
    const network = 'rinkeby' // use rinkeby testnet
    const provider = ethers.getDefaultProvider(network)
    provider.getBalance(addr).then((balance) => {
     // convert a currency unit from wei to ether
     const balanceInEth = ethers.utils.formatEther(balance)
     console.log(`balance: ${balanceInEth.slice(0, 4)} ETH`);
     dispatch(setBalance(balanceInEth.slice(0, 4)))
    })
  }

  function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('Metamask is installed');
      // Connect wallet to metamask.
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((res) => {
          dispatch(inputAddr(res[0]))
          balanceFromWallet(res[0]);
        })
        .catch((error) => {
            if (error.code === 4001) {
                console.log('Please connect to MetaMask.');
            } else {
                console.error(error);
            }
        });
    } else {
      alert('Please install metamask extension.');
      window.location.href = 'https://metamask.io/';
    }
  }
  
  async function handleWalletConnent (){
    connectWallet()
  }

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-orange-500  text-base font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              <FontAwesomeIcon icon={faHome} />
              <span className="ml-1">Home</span>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
            <FontAwesomeIcon className="text-orange-500" icon={faThList} />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-index-navbar"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Docs
                </a>
              </li>
            </ul>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center">
                <button
                  className="bg-orange-500 rounded-full text-white active:text-sm font-bold uppercase px-4 py-2 rounded shadow  outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleWalletConnent}
                >
                  {
                    address?
                    <div>
                      <span>{balance? balance +"ETH" :null}</span>
                      <span className="ml-2 bg-white" style={{padding:'0.2rem 0.5rem', color:'rgb(220,38,38)', borderRadius:'2rem'}}>
                        {address.slice(0, 6)}...{address.slice(
                          address.length - 4,
                          address.length
                        )}
                      </span>
                    </div>
                    :<>
                      <FontAwesomeIcon icon={faWallet}/> 
                      <span className="ml-2">Connet Wallet</span>
                    </>
                  }
                  
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
