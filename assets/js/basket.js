$(document).ready(function () {

    //responsiv navbar

    $(document).on("click", ".hamburger-menu", function () {
        $(".sidebar").removeClass("hide-sidebar");
        $("#overlay").css("display", "block")
    })

    $(document).on("click", ".x-icon", function () {
        $(".sidebar").addClass("hide-sidebar");
        $("#overlay").css("display", "none")
    })

    $(document).on("click", ".sidebar-pages", function (e) {
        e.preventDefault()
        $(".sidebar-pages-list").toggleClass("d-none");
    })

    //curency drop-down

    $(document).on("click", ".currency", function () {
        $(".valyuta").toggleClass("d-none")
        $(".language-area").addClass("d-none");
    })

    $(document).on("click", ".usd-btn", function () {
        let usdText = $(".usd-btn").children().eq(0).text();
        $(".currency").children().eq(0).text(usdText);
        $(".valyuta").addClass("d-none");

    })

    $(document).on("click", ".eur-btn", function () {
        let eurText = $(".eur-btn").children().eq(0).text();
        $(".currency").children().eq(0).text(eurText);
        $(".valyuta").addClass("d-none")
    })
    $(document).on("mouseout", ".valyuta", function () {

    })


    //language drop-down

    $(document).on("click", ".language", function (e) {
        e.preventDefault()

        $(".language-area").toggleClass("d-none");
        $(".valyuta").addClass("d-none")

    });
    $(document).on("click", ".language-area button", function () {
        let btnText = $(this).html();
        $(".language").children().eq(0).html(btnText + `<i class="fa-solid fa-sort-down"></i>`);
        $(".language-area").addClass("d-none");

    })




    //overlay
    $(document).on("click", "#overlay", function () {
        $(".sidebar").addClass("hide-sidebar");
        $("#overlay").css("display", "none")
    })


    //icons




    //pages

    $(document).on("click", ".pages", function (e) {
        e.preventDefault();
        $(".pages-list").removeClass("d-none");
    })




    //basket icon 



    $(document).on("click", "#nav-area .cart", function (e) {
        e.preventDefault()

        $(".spCard-dropdown").toggleClass("d-none");


    });






    //get-basket product


    let tableBody = document.querySelector("#products .basket-products .table tbody");

    let products = JSON.parse(localStorage.getItem("basket"));


    if(products != null){

        for (const product of products) {
            tableBody.innerHTML += `
                <tr data-id="${product.id}">
                <td>
                <img src="${product.img}" alt="">
                </td>
                <td>${product.name}</td>
                <td>$ ${product.price}</td>
                <td>
                    <button><i class="fa-solid fa-minus"></i></button>
                    <input type="text"disabled placeholder = "${product.count}">
                    <button><i class="fa-solid fa-plus "></i></button>
                </td>
                <td class="price">266.00</td>
                <td><i class="fa-solid fa-x delete-icon"></i></td>
            </tr>`
        }

        getBasketCount(products);

    }else{


    }





    function getBasketCount(arr) {
        let sum = 0;

        for (const item of arr) {

            sum += item.count;
        }

        document.querySelector(".count").innerText = sum;
     
    }



    function deleteIdProduct(id){
        products = products.filter(m => m.id != id )

        localStorage.setItem("basket" , JSON.stringify(products));

    }


    let deletIcons = document.querySelectorAll("#products .basket-products .table .delete-icon");


    deletIcons.forEach(deletIcon => {
        
        deletIcon.addEventListener("click",function(){
            let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"))
            console.log(id);
            deleteIdProduct(id);

            this.parentNode.parentNode.remove();

            getBasketCount(products);
        })
    });












})

