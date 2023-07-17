
const mp = new MercadoPago('TEST-60a16dec-f63c-416f-8ae2-7294431a4c00');
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