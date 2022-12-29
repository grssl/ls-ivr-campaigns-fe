import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Auths from '../../auth/index';
import { LogoutFunctionHandler } from '../Api/APICall';

const notActivecss = "block py-1 md:py-3  font-bold  text-center  pl-1 align-middle text-pink-600 no-underline hover:text-gray-900 border-b-2  hover:border-orange-600";
const Activecss = "border-orange-600 block  font-bold   text-center py-1 md:py-3 pl-1 align-middle text-pink-600 no-underline hover:text-gray-900 border-b-2  hover:border-orange-600";

export default function NavBarComponent() {
    const [UserMenuVisible, setUserMenuVisible] = useState(false);
    const [NavBarToggle, setNavBarToggle] = useState(false);
    const uselocations = useLocation();
    const first = (uselocations.pathname.split('/')[1]).toLowerCase();
    const AuthList = Auths.filter(
        (auth) => auth.role === first.toUpperCase()
    )
    return (
        <nav className="bg-white fixed w-full z-10 top-0 shadow">
            <div className="w-full mx-auto px-6 flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
                <div className="w-1/2 pl-2 md:pl-0">
                    <Link className="text-gray-900  text-base xl:text-xl no-underline hover:no-underline font-bold" to="/">
                        <img src={require('../../assets/clientlogo.png')} alt="Vyana" />
                    </Link>
                </div>
                <div className="w-1/2 pr-0">
                    <div className="flex relative float-right">
                        <img src={require('../../assets/grlogo.png')} alt="Vyana" className="h-10 pr-4" />

                        <div className="relative text-sm">
                            <button onClick={() => setUserMenuVisible(v => !v)} className="flex items-center focus:outline-none mr-3">
                                <img className="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of User" /> <span className="hidden md:inline-block">Hi, User </span>
                                <svg className="pl-2 h-2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlnsXlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 129 129">
                                    <g>
                                        <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                                    </g>
                                </svg>
                            </button>
                            <div className={`bg-white rounded shadow-md absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 ${UserMenuVisible ? 'visible' : 'invisible'}`}>
                                <ul className="list-reset">
                                    <li><Link to="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">My account</Link></li>
                                    <li><Link to="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Notifications</Link></li>
                                    <li>
                                        <hr className="border-t mx-2 border-gray-400" />
                                    </li>
                                    <li><Link to="#" onClick={LogoutFunctionHandler} className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="block lg:hidden pr-4">
                            <button onClick={() => setNavBarToggle(v => !v)} className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`w-full flex-grow lg:items-center lg:w-auto  lg:block mt-2 lg:mt-2 bg-white z-20 ${NavBarToggle ? "" : "hidden"}`}>
                    <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                        {

                            AuthList.length > 0 ?
                                AuthList[0].menuList.map(item => (
                                    <li className="mr-6 my-2 md:my-0" key={`${item.name}`}>
                                        <NavLink

                                            className={({ isActive }) => (isActive ? Activecss : notActivecss)}
                                            to={first + "/" + item.path}>
                                            <i className={`fas fa-${item.icon} fa-fw mr-3 text-pink-600`} />
                                            <span className="pb-1 md:pb-0 text-sm">{item.name}</span>
                                        </NavLink>
                                    </li>

                                ))
                                : ''
                        }

                        {/* <li className="mr-6 my-2 md:my-0">
                            <Link to="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500">
                                <i className="fas fa-tasks fa-fw mr-3" /><span className="pb-1 md:pb-0 text-sm">Tasks</span>
                            </Link>
                        </li>
                        <li className="mr-6 my-2 md:my-0">
                            <Link to="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500">
                                <i className="fa fa-envelope fa-fw mr-3" /><span className="pb-1 md:pb-0 text-sm">Messages</span>
                            </Link>
                        </li>
                        <li className="mr-6 my-2 md:my-0">
                            <Link to="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500">
                                <i className="fas fa-chart-area fa-fw mr-3" /><span className="pb-1 md:pb-0 text-sm">Analytics</span>
                            </Link>
                        </li>
                        <li className="mr-6 my-2 md:my-0">
                            <Link to="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-red-500">
                                <i className="fa fa-wallet fa-fw mr-3" /><span className="pb-1 md:pb-0 text-sm">Payments</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
