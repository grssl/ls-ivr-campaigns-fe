import * as React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBarComponent from '../components/menu-list/NavBarComponent';

export default function MainPage() {
  return (
    <main className="bg-gray-100 font-sans leading-normal tracking-normal">
      <ToastContainer />
      <NavBarComponent />
      <div className="w-full mx-auto pt-24">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
          <Outlet />
        </div>
      </div>
      {/* <FooterComponent /> */}
    </main>
  )
}
