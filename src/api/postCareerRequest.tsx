import { CareerRequest } from "@components/screens/RequestBooster/components/CareerForm"

const postCareerRequest = async (careerReq: CareerRequest): Promise<Response> => {
  const response = await fetch("http://localhost:9999/become-booster", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(careerReq),
  })
  // const raw = await response.json()
  return response
}
export default postCareerRequest
