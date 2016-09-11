# Dankotuwa Server

#### Build steps

* `npm install -g grunt-cli`
* `npm install`

#### Running on browser

* `grunt`



API DOCUMENTATION
==================


**Show Products**
----
  Returns a list of all products as JavaScript objects.

* **URL**

  /api/products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"ProductID":1,"ProductName":"Dinner plate"},{"ProductID":2,"ProductName":"Salad plate"}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{}`


**Show Categories**
----
  Returns a list of all categories as JavaScript objects.

* **URL**

  /api/categories

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"CategoryID":1,"CategoryName":"Blue rose"},{"CategoryID":2,"CategoryName":"Livy"}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{}`

**Show Sales Representatives**
----
  Returns a list of all sales representatives as JavaScript objects.

* **URL**

  /api/reps

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"EmployeeID":1,"Name":"Udara Nanayakkara","UserName":"udara","Email":"udara@dankotuwa.com"}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{}`

**Show Orders from a rep**
----
  Returns a JSON of all orders by a certain sales rep.

* **URL**

  /api/orders/rep:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"1":{"epoch":1471341682,"items":[{"ProductID":1,"CategoryID":3},{"ProductID":2,"CategoryID":2}]},"3":{"epoch":1471341699,"items":[{"ProductID":2,"CategoryID":1},{"ProductID":3,"CategoryID":3}]}}
`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{}`

**Submit Order**
----
  Submit an order.

* **URL**

  /api/order

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  `{"epoch":1472210342,"repID":3,"dealerID":1,"atLocation":1,"items":[{"product":{"ProductID":2,"ProductName":"Salad plate"},"category":{"CategoryID":2,"CategoryName":"Livy"},"quantity":2}]}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `OK`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{}`


