import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'
import useOutsideClick from './useOutsideClick'

type ModalType = {
  children: React.ReactNode
  onClick: React.Dispatch<React.SetStateAction<boolean>>
  active: boolean
  close?: boolean
  bg?: boolean
  size?: string
}

const Modal = ({ children, onClick, active, close, bg = true, size }: ModalType) => {
  const ref = useRef(null)
  const buttonClickedOutside = useOutsideClick(ref)

  useEffect(() => {
    if (buttonClickedOutside && active) {
      onClick(!active)
    }
  }, [buttonClickedOutside, onClick, active])

  return (
    <>
      <div
        className={classNames(
          'modal hide-scrollbar fixed bottom-0 left-0 right-0 top-30 z-[9999] flex flex-col items-center overflow-x-scroll overflow-y-scroll  bg-gray-200 bg-opacity-50 px-4 py-24 backdrop-blur-[0.7px] transition-opacity duration-300 sm:py-32',
          active ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <div
          ref={ref}
          className={classNames(
            'mx-auto w-11/12 origin-bottom transform rounded-[5px] transition-all delay-200 duration-500 ',
            active ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-90 opacity-0',
            { 'bg-white': bg },
            size || 'max-w-lg'
          )}
        >
      

          {children}
        </div>
      </div>
    </>
  )
}

export default Modal
