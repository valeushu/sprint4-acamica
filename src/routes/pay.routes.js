import { Router } from 'express';
const router = Router();
import * as payCtrl from '../controllers/pay.controller.js';
import { checkAuth } from '../middlewares/index.js';




router.post('/',[checkAuth], payCtrl.createPayment);
//router.get('/', payCtrl.getPayMeth);
router.get('/', (req, res) => res.render('paypal'));

router.post("/pay", payCtrl.createOrder );
router.get("/success", payCtrl.success );
router.get('/cancel', (req, res) => res.send('Cancelled'));


router.put('/:paymentId', [checkAuth], payCtrl.updatePaymentById);
router.delete('/:paymentId',[checkAuth],  payCtrl.deletePaymentById);

export default router;

/**
 * @swagger
 * /api/payment:
 *  post:
 *    tags: [payment methods]
 *    summary: new payment method.
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - payment
 *              - deleted
 *            properties:
 *               payment:
 *                 description: product name
 *                 type: string
 *               deleted:
 *                 description: status payment
 *                 type: boolean
 *            example:
 *              payment: cash
 *              deleted: false
 *    responses:
 *      201:
 *       description: Payment method create
 */

/**
 * @swagger
 * /api/payment:
 *  get:
 *    tags: [payment methods]
 *    summary: payment methods
 *    description: List of payment methods
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del user logged.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: List of payment methods
 */

/**
 * @swagger
 * /api/payMeth/{paymentId}:
 *  put:
 *    summary: payment method.
 *    tags: [payment methods]
 *    description: payment method update
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: paymentId
 *        required: true
 *        description: Id of payment method update
 *        schema:
 *          type: string
 *          example: 618e81a684acdcc5882c2ea8
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - payment
 *                - deleted
 *              properties:
 *                payment:
 *                  type: string
 *                  description: Name payment method
 *                deleted:
 *                  type: boolean
 *                  description: status payment
 *              example:
 *                payment: credit card
 *                deleted: false
 *    responses:
 *       201:
 *        description: updated payment method
 */
/**
 * @swagger
 * /api/payMeth/{paymentId}:
 *  delete:
 *     summary: Delete payment method (Only Admins).
 *     description: Only admins can delete payment method.
 *     tags: [payment methods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *           example: 618e81a684acdcc5882c2ea8
 *     responses:
 *       "200":
 *         description: OK
 */
