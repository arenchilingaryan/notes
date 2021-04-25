import React, { useEffect, useRef, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import './Modal.scss'
import { cleanup } from '@testing-library/react';

const Modal = ({ show, onClose, title, cleanup, children }) => {
    const [modalWillClose, setModalWillClose] = useState(false)
    const [overlayIsOpen, setOverlayIsOpen] = useState(false)

    const modalRef = useRef()

    useEffect(() => {
        const body = document.body
        const keyDownHandler = (event) => {
            if (event.keyCode === 27) {
                onClose()
            }
        }
        if (show) {
            setOverlayIsOpen(true)
            body.style.paddingRight = '16px'
            body.classList.add('bodylock')
        }
        window.addEventListener('keyup', keyDownHandler)

        return () => {
            setOverlayIsOpen(false)
            body.classList.remove('bodylock')
            body.style.removeProperty('padding-right')
            window.removeEventListener('keyup', keyDownHandler)
            if (cleanup) {
                return cleanup()
            }
        }
    }, [show])

    useEffect(() => {
        if (modalWillClose) {
            setOverlayIsOpen(false)
            setTimeout(() => {
                setModalWillClose(false)
                onClose()
            }, 200)
        }
    }, [modalWillClose])

    const onCloseModalHandler = () => setModalWillClose(true)

    const checkContentOverlay = (e) => {
        e.stopPropagation()
    }

    const closeModalFromOverlay = () =>
        onCloseModalHandler()


    return (
        <>
            <div
                className={
                    show
                        ? modalWillClose
                            ? "overlay"
                            : "overlay overlay-active"
                        : "overlay"
                }
                onClick={closeModalFromOverlay}
            />
            <div
                ref={modalRef}
                className={
                    show
                        ? modalWillClose
                            ? "modal-open modal-will-close terms_wrapper"
                            : "modal-open terms_wrapper terms_wrapper-open"
                        : "terms_wrapper"
                }
                onClick={checkContentOverlay}
            >
                <div className="terms_wrapper-title">
                    <span className="terms_wrapper-title-name">{title}</span>
                    <CloseIcon onClick={onCloseModalHandler} className="x-icon" />
                </div>
                {children}
            </div>
        </>
    )
}

export default Modal
