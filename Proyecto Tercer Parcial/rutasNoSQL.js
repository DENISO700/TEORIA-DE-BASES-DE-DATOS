import Router from 'express'
import { getEmployees, getCustomers, getShippers,getProducts, getProductsByID, postOrder, postOrderDetail, getLastOrderID, putExistencias, getAllInfoLastOrderID, getAllDetailsId } from './controladorNoSQL.js'
const router = Router()

router.get('/customers',getCustomers)
router.get('/employees',getEmployees)
router.get('/shippers',getShippers)
router.get('/products',getProducts)
router.get('/products/:id',getProductsByID)
router.post('/order',postOrder)
router.get('/lastOrder',getLastOrderID)
router.get('/infoFacturaOrder/:id',getAllInfoLastOrderID)
router.get('/infoDetails/:id',getAllDetailsId)
router.post('/orderDetail',postOrderDetail)
router.put('/existencias/:id',putExistencias)

export default router