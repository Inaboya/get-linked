import React from 'react'

const useOutsideClick = (ref: any) => {
  const [outsieClick, setOutsideClick] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOutsideClick(true)
      } else {
        setOutsideClick(false)
      }

      setOutsideClick(null)
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return outsieClick
}

export default useOutsideClick
