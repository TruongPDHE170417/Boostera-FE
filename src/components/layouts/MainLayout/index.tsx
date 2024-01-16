import React, { HTMLAttributes, PropsWithChildren } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Head from 'next/head'

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>

const MainLayout: React.FC<Props> = (props) => {
  const { children, className, title } = props
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="sm:flex min-h-screen font-plus">
        <div className={`flex-auto container-w ${className || ''}`}>
          <div className="min-h-screen flex flex-col">
            <div className="flex justify-center fixed w-full z-30 ">
              <Header />
            </div>
            <div className="mt-4 flex-grow bg-[#F4F5F6]">{children}</div>
            <Footer />
          </div>
        </div>
      </main>
    </>
  )
}

export default React.memo(MainLayout)
