import ClientOnlyPortal from '@components/modal/ClientOnlyPortal'
import { useState } from 'react'

export default function Modal({ open, title, onClose, children }) {

    return (
        <>
            {open && (
                <ClientOnlyPortal selector="#modal">
                    <div className="backdrop flex justify-center items-center">
                        <div className="modal rounded-md">
                            <div className="header flex justify-between bg-gray-300">
                                <div>{title || ''}</div>
                                <button type="button" onClick={onClose}>X</button>
                            </div>
                            {children}
                        </div>
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
              .modal {
                background-color: white;
                min-width: 400px;
              }
            `}</style>
                    </div>
                </ClientOnlyPortal>
            )}
        </>
    )
}