//handle when vnpay redirect back
import queryString from 'qs';
import { TRANSACTION_SUCCESS_CODE } from "@constants/payment"
import { API_ENDPOINT } from "@models/api"

const handler = async (req, res) => {
    try {
        const uiRedirect = "login" //after handle, what we will handle

        const createUser = async (email, accountName, tagId) => {
            const response = await fetch(API_ENDPOINT + "/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: email,
                    email: email,
                    ING: accountName,
                    tag: tagId,
                }),
            })
            const data = await response.json()
            return data.data
        }

        const findExistingUser = async (email) => {
            const response = await fetch(API_ENDPOINT + "/user/by-email/" + email, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const data = await response.json()
            return data
        }

        let vnpParam = await req.query;
        let serverApi = API_ENDPOINT + "/payment/vnpay_return"
        serverApi += '?' + queryString.stringify(vnpParam, { encode: false })
        const transactionStatus = vnpParam['vnp_TransactionStatus'];
        if (transactionStatus !== TRANSACTION_SUCCESS_CODE) {
            const errorMessage = "Fail to create payment!";
            res.status(400).json({ error: errorMessage });
            res.redirect(`/prices?error=${errorMessage}`);
        } else if (transactionStatus === TRANSACTION_SUCCESS_CODE) {
            const existingUser = await findExistingUser(vnpParam['email']);
            if (!existingUser) {
                const createdNewUser = await createUser(vnpParam['email'], vnpParam['ING'], vnpParam['tag']);
            }
            const response = await fetch(serverApi, {
                method: "GET",
                mode: "cors",
            });
            const data = await response.json();
            res.redirect(`/${uiRedirect}`);
        } else {
            throw new Error("Unknown transactionStatus code: " + transactionStatus);
        }
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

export default handler;