import { useEffect, useState } from "react";

export default function DesktopSidebar({ onClose }) {

    const [open, setOpen] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 10);
        return () => clearTimeout(timer);
    }, []);

    const closeSidebar = () => {
        setOpen(false);
        setTimeout(() => {
            onClose()
        }, 400);
    }

    return <div className={`backdrop relative ${open ? 'open' : ''}`}>
        <div className="bg-white w-64 h-full st-menu">
            <div className="cursor-pointer" onClick={closeSidebar}>close</div>
            <div className="flex flex-col">Sidebar</div>
        </div>
        <div className="absolute -z-1 w-screen h-screen top-0 left-0" onClick={closeSidebar}></div>


        <style jsx>{`
              :global(body) {
                overflow: hidden;
              }
              .backdrop {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.7);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
              }

              .st-menu {
                visibility: visible;
                -webkit-transform: translate3d(-100%, 0, 0);
                transform: translate3d(-100%, 0, 0);
                -webkit-transition: all 0.3s;
                transition: all 0.3s;
              }

              .backdrop.open .st-menu {
                  visibility: visible;
                  -webkit-transform: translate3d(0, 0, 0);
                  transform: translate3d(0, 0, 0);
              }

            `}</style>

    </div>
}