import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

/**
 * @swagger
 * components:
 *    schemas:
 *       Product:
 *          type: object
 *          properties:
 *             id:
 *                type: integer
 *                description: The Product ID
 *                example: 1
 *             name:
 *                type: string
 *                description: The Product name
 *                example: Monitor de 27 pulgada
 *             price:
 *                type: number
 *                description: The Product price
 *                example: 1200
 *             availability:
 *                type: boolean
 *                description: The Product availability
 *                example: true
 *
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *       summary: Get a list of products
 *       tags:
 *          -  Products
 *       description: Return a list of products
 *       responses:
 *          200:
 *             description: Succesful response
 *             content:
 *                application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/Product'
 *
 *
 */

// Routing
const router = Router();
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *       summary: Get a producto by id
 *       tags:
 *          -  Products
 *       description: Return a product based on its unique ID
 *       parameters:
 *          -  in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                type: integer
 *       responses:
 *          200:
 *             description: Successful Response
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Product'
 *          404:
 *             description: Not found
 *          400:
 *             description: Bad Request - Invalid ID
 */
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *    post:
 *       summary: Create a new product
 *       tags:
 *          -  Products
 *       description: Returns a new record in the database
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      name:
 *                         type: string
 *                         example: "Monitor Curvo 27 Pulgadas"
 *                      price:
 *                         type: number
 *                         example: 300
 *       responses:
 *          201:
 *             description: Sucessful response
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Product'
 *
 *          400:
 *             description: Bad Request - invalid inout data
 */

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handleInputErrors,
  createProduct
);
/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *       summary: Updates a product with user input
 *       tags:
 *          -  Products
 *       description: Returns the updated product
 *       parameters:
 *          -  in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                type: integer
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      name:
 *                         type: string
 *                         example: "Monitor Curvo 27 Pulgadas"
 *                      price:
 *                         type: number
 *                         example: 300
 *                      availability:
 *                         type: boolean
 *                         example: true
 *       responses:
 *          200:
 *             description: Sucessful response
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Product'
 *
 *          400:
 *             description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *             description: Product Not Found
 */

// put =  se utiliza pra actualizar o reemplazar completamente un recurso existente en un servidor web
router.put(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  body("availability").isBoolean().withMessage("El campo no puede ir vacio"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *       summary: Update Product availability
 *       tags:
 *          -  Products
 *       description: Returns the update a availability
 *       parameters:
 *          -  in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                type: integer
 *       responses:
 *          200:
 *             description: Sucessful response
 *             content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Product'
 *
 *          400:
 *             description: Bad Request - Invalid ID
 *          404:
 *             description: Product Not Found
 *
 */

// patch = se utiliza para realizar modifiaciones parciales en un recurso existente en un servidor web
router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *       summary: Delete a Product by a given iD
 *       tags:
 *          - Products
 *       description: Return a confirmation message
 *       parameters:
 *          -  in: path
 *             name: id
 *             description: The ID of the product to delete
 *             required: true
 *             schema:
 *                type: integer
 *       responses:
 *          200:
 *             description: Sucessful response
 *             content:
 *                application/json:
 *                   schema:
 *                      type: string
 *                      value: 'Prodcuto Eliminado'
 *          400:
 *             description: Bad Request - Invalid ID
 *          404:
 *             description: Product Not Found
 *
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
