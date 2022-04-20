const checkout = document.getElementById('checkout');
checkout.addEventListener('click', async function () {
    const response = await fetch('api/payment/create-order', {
        method: 'POST',
    })
    ;
    const data = await response.json();
    console.log(data);
    window.location.href = data.links[1].href;
});
/** 
const checkout = document.getElementById('checkout');
checkout.addEventListener('click', async function () {
    const response = await fetch('api/payment/create-order', {
        method: 'POST',
    }).then(res => res.json())
    ;

    const data = response;
    console.log(data);
    //window.location.href = data.links[1].href;
});*/