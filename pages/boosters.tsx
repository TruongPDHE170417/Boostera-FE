import dynamic from 'next/dynamic'
import MainLayout from "@components/layouts/MainLayout"

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
