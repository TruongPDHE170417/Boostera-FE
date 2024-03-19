import React, { useEffect, ComponentType } from 'react';
import { useBoundStore } from '@zustand/total';
import { NOTIFICATION_TYPE, notify } from '@utils/notify';

interface AuthProps {
  isAuthenticated: boolean;
  userRole: string | null;
}

const withAuth = <P extends AuthProps>(
  WrappedComponent: ComponentType<P>,
  requiredRole: string[]
) => {
  const WithAuth: React.FC<Omit<P, keyof AuthProps>> = (props) => {
    const { accountInfo } = useBoundStore((store) => ({
      accountInfo: store.accountInfo,
    }))

    if (requiredRole.includes(accountInfo.role ?? "")) {
      return <WrappedComponent {...props as P} />;
    } else {
      import('next/router').then((Router) => {
        Router.default.push('/login'); // Redirect to login page
      });
      setTimeout(() => {
        notify(NOTIFICATION_TYPE.ERROR, 'Unauthorized access', { toastId: 'Auth notify' })
      }, 50)
    }
  };

  return WithAuth;
};

export default withAuth;
