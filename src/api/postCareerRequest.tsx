import { CareerRequest } from "@components/screens/RequestBooster/components/CareerForm"

const postCareerRequest = async (careerReq: CareerRequest): Promise<Response> => {
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(careerReq),
  })
  // const raw = await response.json()
  return response
}
export default postCareerRequest
