import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { useBoundStore } from '@zustand/total'
import { useRouter } from 'next/router'
import { HTMLAttributes, useEffect } from 'react'

const useAuth = (WrappedComponent: HTMLAttributes<HTMLDivElement>,
  allowedRoles: string[]) => {
  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo
  }))

  const route = useRouter()

  useEffect(() => {
    const role = accountInfo.role
    if(!allowedRoles.includes(role || "")) {
      route.back()
      setTimeout(() => {
        notify(NOTIFICATION_TYPE.ERROR, 'Unauthorized access')
      }, 50)
    }
  }, [])
  
  return WrappedComponent
}

export default useAuth