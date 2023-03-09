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

    function getBasketDatas(){
        if (products != null) {

            for (const product of products) {
                tableBody.innerHTML += `
                    <tr data-id="${product.id}">
                    <td>
                    <img src="${product.img}" alt="">
                    </td>
                    <td>${product.name}</td>
                    <td>$ ${product.price}</td>
                    <td>
                        <button class = "minus"><i class="fa-solid fa-minus"></i></button>
                        <input value = "${product.count}" type="text"disabled>
                        <button class = "plus"><i class="fa-solid fa-plus "></i></button>
                    </td>
                    <td class="price"> $ ${product.price * product.count}</td>
                    <td><i class="fa-solid fa-x delete-icon"></i></td>
                </tr>`
            }
    
            getBasketCount(products);
    
        } else {
    
            showAlert()
        }
    
    
    }

    getBasketDatas();


    //alert
    function showAlert() {
        
        document.querySelector(".basket-products .table").classList.add("d-none");
        document.querySelector("#products .show-alert").classList.remove("d-none")

    }



// basket count
    function getBasketCount(arr) {
        let sum = 0;

        for (const item of arr) {

            sum += item.count;
        }

        document.querySelector(".count").innerText = sum;

    }




    //basket delete


    function deleteIdProductFromBasket(id) {
        products = products.filter(m => m.id != id)

        localStorage.setItem("basket", JSON.stringify(products));
        showTotalPrice();

    }


    function deleteIcons(){
        let deletIcons = document.querySelectorAll("#products .basket-products .table .delete-icon");

        deletIcons.forEach(deletIcon => {
    
            deletIcon.addEventListener("click", function () {
                let id = parseInt(this.parentNode.parentNode.getAttribute("data-id"))
    
                deleteIdProductFromBasket(id);
    
                this.parentNode.parentNode.remove();
    
                if(products.length == 0){
                    localStorage.removeItem("basket")
                    showAlert();
                }
                getBasketCount(products);
            })
        });
    }
   
    deleteIcons();



    //basket total

    function showTotalPrice() {
        let total = document.querySelector("#products .table tr td:nth-child(5) span");
        let sum = 0;

        for (const product of products) {
            sum += parseInt(product.price * product.count)
        }
        total.innerHTML = "Grand total: $" + sum;
    }


    function decreaseProduct(){

        let minusIcons = document.querySelectorAll("tbody tr td  .minus");

        for (const minusIcon of minusIcons) {
    
            minusIcon.addEventListener("click", function () {
    
                for (const product of products) {
                    if (product.id == minusIcon.parentNode.parentNode.getAttribute("data-id")) {
                        if (minusIcon.nextElementSibling.value == 1) {
                            return;
                        }
                        else {
                            minusIcon.nextElementSibling.value--;
    
                            product.count--;
    
                            minusIcon.parentNode.nextElementSibling.innerText = "$ " + product.price * product.count;
                        }
    
                    }
                }
    
                localStorage.setItem("basket", JSON.stringify(products))
                showTotalPrice();
                getBasketCount(products);
            })
    
        }
    }
    decreaseProduct();


    function increaseProduct(){
        let plusIcons = document.querySelectorAll("tbody tr td  .plus");

        for (const plusIcon of plusIcons) {
            plusIcon.addEventListener("click", function () {
    
                for (const product of products) {
                    if (product.id == plusIcon.parentNode.parentNode.getAttribute("data-id")) {
    
                        plusIcon.previousElementSibling.value++;
    
                        product.count++;
    
                        plusIcon.parentNode.nextElementSibling.innerText = "$ " + product.price * product.count;
    
    
                    }
                }
    
                localStorage.setItem("basket", JSON.stringify(products))
                showTotalPrice();
                getBasketCount(products);
    
            })
    
        }
    }
    increaseProduct();



    





})

