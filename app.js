const express = require('express');
const app = express();
const cors = require("cors");

// --- Integracion mercadopago ---
// SDK de Mercado Pago
const mercadopago = require("mercadopago");

// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-2926550097213535-092911-9f95049df86420b3055add7ae6e0e56e-1160956296",
  "x-integrator_id": "dev_24c65fb163bf11ea96500242ac130004",
  integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

mercadopago.configurations.setAccessToken("TEST-2926550097213535-092911-9f95049df86420b3055add7ae6e0e56e-1160956296");

// ------------------------------

let exphbs  = require('express-handlebars');

let port = process.env.PORT || 3000

 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


 
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});


// --- Integracion mercadopago Rutas---

app.get("/failure", function (request, res) {
  res.render("failure", request.query);
});

app.get("/pending", function (request, res) {
  res.render("pending", request.query);
});

app.get("/success", function (request, res) {
  res.render("success", request.query);
});

app.get("/checkout", function (request, res) {
  res.render("checkout", request.query);
});

app.post("/notifications" , function (request, res) {
  console.log(request.body);
  res.status(200).send("Ok");
});

 
// <<<
app.get('/feedback', function (req, res) {
  console.log(req.query)
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id
  }).status(200).send("Ok");
  
});
// <<<

app.post("/create_preference" , function (req, res) {

// ******************************************
  
      let preference = {
      items: [
        {
          id: Number(2023),
          title: req.body.title,
          description: "Dispositivo móvil de Tienda e-commerce",
          picture_url: ("https://valcoellar-mp-commerce-nodejs.onrender.com" + req.body.img),
          quantity: Number(req.body.unit),
          unit_price: Number(req.body.price),
          currency_id: "MXN",
        }
      ],
      payer: {
      name: "Lalo",
      surname: "Landa",
    email: "test_user_94708656@testuser.com",
      //email: "direccion@gruponucleon.com",
      phone: {
        area_code: "52",
        number: Number(5550545687),
      },
      address: {
        street_name: "calle falsa",
        street_number: Number(123),
        zip_code: "09060",
      },
    },
      back_urls: {
        "success": "https://valcoellar-mp-commerce-nodejs.onrender.com/success",
        "failure": "https://valcoellar-mp-commerce-nodejs.onrender.com/failure",
        "pending": "https://valcoellar-mp-commerce-nodejs.onrender.com/pending"
      },
      auto_return: "approved",
      payment_methods: {
      excluded_payment_methods: [
        {
          id: "visa",
        },
      ],
      excluded_payment_types: [   
        {
          id: "tickets",    // atm
        },
      ],
      
      installments: 6,
    },
    notification_url: `https://valcoellar-mp-commerce-nodejs.onrender.com/notifications`, 
    external_reference: "direccion@gruponucleon.com",
    expires: false,
    
 
    };

 mercadopago.preferences.create(preference)
      .then(function (response) {
    let id = response.body.id;
   res.redirect(response.body.init_point) 
    })
    .catch(function (error) {
        console.log(error);
      })
 

// ******************************************

});

















app.listen(port);
