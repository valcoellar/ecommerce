
const mp = new MercadoPago('TEST-179e1cbc-8f9d-4b85-944b-112d3c67838e');
const bricksBuilder = mp.bricks();


/*

function initWallet(){
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

mp.bricks().create("wallet", "wallet_container", {
   initialization: {
       preferenceId: id,
   },
});

console.log(id);
}
*/