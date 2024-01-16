import "../styles/tailwind.css"
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SLATE_TIME_QUERY } from "@constants/query"
import { ToastContainer } from "react-toastify"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: SLATE_TIME_QUERY
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <ToastContainer />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default MyApp
