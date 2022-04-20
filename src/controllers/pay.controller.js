import PaymentMethod from '../models/payMethod.js';
import axios from 'axios';

/**export const createPayment = async (req, res) => {
    const { payment, deleted } = req.body;
    const newPayMeth = new PaymentMethod({ payment, deleted });
    const paymentSaved = await newPayMeth.save();

    res.status(201).json({
        paymentaved,
    });
};*/

export const createOrder = async (req, res) => {
    try {
        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    items: [
                        {
                            name: 'T-Shirt',
                            description: 'Green XL',
                            quantity: '1',
                            unit_amount: {
                                currency_code: 'USD',
                                value: '5.00',
                            },
                        },
                    ],
                    amount: {
                        currency_code: 'USD',
                        value: '5.00',
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: '5.00',
                            },
                        },
                    },
                },
            ],
            application_context: {
                brand_name: 'Delilah resto',
                return_url: 'http://localhost:7000/api/payment/capture-order',
                cancel_url: 'http://localhost:7000/api/payment/cancel-order',
            },
        };
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        const {
            data: { access_token },
        } = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
            headers: {
                'content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET,
            },
        });
        console.log(access_token);
        const response = await axios.post(process.env.PAYPAL_API + '/v2/checkout/orders', order, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        console.log(response.data)
        res.json(response.data);
    } catch (error) {
        res.status(500).send('algo anduvo mal en creando orden');
    }
};

export const captureOrder = async (req, res) => {
    const { token } = req.query;
    const response = await axios.post(
        process.env.PAYPAL_API + '/v2/checkout/orders/' + token + '/capture',
        {},
        {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET,
            },
        }
    );
    console.log(response.data);
    return res.redirect('/payed.html');
};

export const cancelOrder = async (req, res) => {
    res.redirect('/');
};

export const updatePaymentById = async (req, res) => {
    const updatePayMeth = await PaymentMethod.findByIdAndUpdate(req.params.paymentId, req.body, {
        new: true,
    });
    res.status(200).json({ 'update payment method': updatePayMeth });
};

export const deletePaymentById = async (req, res) => {
    await PaymentMethod.findByIdAndDelete(req.params.paymentId);
    res.send('Payment method deleted');
};
