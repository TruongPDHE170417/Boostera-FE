import { useRouter } from "next/router"
import MainLayout from "@components/layouts/MainLayout"
import CustomButton from "@components/common/CustomButton"

const Page404 = () => {
  const router = useRouter()

  const backToHome = () => {
    void router.push("/")
  }

  return (
    <MainLayout className="h-full" title="404 - Not Found">
      <div className="text-primary flex h-[calc(100vh-120px)] flex-col items-center justify-center">
        <p className="text-center text-[5rem] font-bold sm:text-[6rem]">404</p>
        <p className="mb-4 text-3xl font-semibold">Not Found</p>
        <CustomButton label="Back To Home" onClick={backToHome} />
      </div>
    </MainLayout>
  )
}

export default Page404
