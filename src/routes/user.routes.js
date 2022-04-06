import { Router } from 'express';
const router = Router();
import * as userCtrl from '../controllers/user.controller.js';

router.post('/', userCtrl.createUser);
router.get('/', userCtrl.getUsers);
router.delete('/:userId', userCtrl.deleteUserById);
export default router;

/**
 * @swagger
 * /api/users:
 *  post:
 *    tags: [users]
 *    summary: new user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      201:
 *       description: creating user
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    tags: [users]
 *    summary: users
 *    security:
 *      - bearerAuth: []
 *    description: List of users
 *    responses:
 *       200:
 *         description: List of users
 */
/**
 * @swagger
 * /api/users/{userId}:
 *  delete:
 *     summary: Delete user (Only Admins).
 *     description: Only admins can delete user.
 *     tags: [users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: 61857f10aeb5eebba6bd75a5
 *     responses:
 *       "200":
 *         description: user deleted
 */
