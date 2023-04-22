import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useNoti = () => {
  const pushNoti = (
    notiType: 'error' | 'success' | 'warning' | 'info',
    message: string
  ): void => {
    const renderColor = (type: string) => {
      switch (type) {
        case 'success':
          return '#388e3c'
        case 'error':
          return '#d32f2f'
        case 'warning':
          return '#ffab00'
        case 'info':
          return '#0091ea'
        default:
          return '#2F2F2F'
      }
    }
    toast[notiType](message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'light',
      progress: undefined,
      style: {
        fontSize: '15px',
        color: renderColor(notiType),
      },
    })
  }

  return [pushNoti] as const
}

export default useNoti
