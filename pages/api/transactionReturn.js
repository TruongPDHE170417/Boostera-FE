//handle when vnpay redirect back
import queryString from 'qs';

const handler = async (req, res) => {
    const uiRedirect = "login" //after handle, what we will handle
    try {
        //find a way to send it to server   
        let vnpParam = await req.query;
        let serverApi = "http://localhost:9999/payment/vnpay_return"
        serverApi += '?' + queryString.stringify(vnpParam, { encode: false })
        const transactionStatus = vnpParam['vnp_TransactionStatus'];
        if (transactionStatus !== "00") {
            res.redirect(`/`);
        } else if (transactionStatus === "00") {
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