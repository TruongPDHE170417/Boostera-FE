import MainLayout from "@components/layouts/MainLayout"
import dynamic from 'next/dynamic'

const BoosterScreen = dynamic(() => import("../src/components/screens/BoosterPage").then(mod => mod.default), {
  ssr: false,
})

const Boosters = () => {
  return (
    <MainLayout className="h-full w-full" title="Boosters">
      <BoosterScreen />
    </MainLayout>
  )
}

export default Boosters
