import { describe, test, before } from "node:test";
import assert from "node:assert";

const apiUrl = "http://localhost:8080";

describe("Products API test", () => {
  // Test para obtener todos los productos
  test("GET /products should return a list of products", async () => {
    const response = await fetch(`${apiUrl}/products/`);
    const responseJSON = await response.json();
    assert.strictEqual(Array.isArray(responseJSON.data.docs), true);
    assert.ok(
      responseJSON.data.docs.length > 0,
      "No hay productos en la base de datos"
    );
    assert.strictEqual(responseJSON.status, 200);
  });

  // Test para obtener un producto por ID
  test("GET /products/:id should return the correct product", async () => {
    const response = await fetch(`${apiUrl}/products/`);
    const responseJson = await response.json();
    const { _id } = responseJson.data.docs[0];
    const productById = await fetch(`${apiUrl}/products/${_id}`);
    const productByIdJson = await productById.json();
    assert.strictEqual(response.status, 200);
    assert.ok(typeof productByIdJson === "object");
    assert.strictEqual(_id, productByIdJson.data._id);
  });
});

describe("Carts API test", () => {
  // Test para obtener error al intentar obtener los productos de un carrito sin loguearse
  test("GET /carts/:id should return 401 if no authorization token is provided", async () => {
    const cartId = "64e5b8d4f61a345fabf3210a"; // Valor de un carrito real
  
    // Hacer la petición sin token de autenticación
    const response = await fetch(`${apiUrl}/carts/${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    // Comprobar el código de estado
    assert.strictEqual(response.status, 401);
  
    const responseJSON = await response.json();
    
    // Verificar que el mensaje devuelto sea 'Unauthorized'
    assert.strictEqual(responseJSON.msg, "Unauthorized");
  });
});
describe("Users API test", () => {
  let token;

  // Test de inicio de sesión
  test("POST /users/login should log in the user", async () => {
    const loginDetails = {
      email: "matias@matias.com",
      password: "1234",
    };

    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginDetails),
    });

    const responseJSON = await response.json();
    token = responseJSON.data;

    assert.strictEqual(response.status, 200);
    assert.ok(typeof responseJSON === "object");
    assert.ok(token, "Token no generado correctamente");
  });

  // Test de cierre de sesión
  test("POST /users/logout should log out the user", async () => {
    const response = await fetch(`${apiUrl}/users/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    assert.strictEqual(response.status, 200);
  });
});
