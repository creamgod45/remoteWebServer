/**
 * @external jQuery ./jquery.3.7.0.js
 */
const $jq = jQuery.noConflict();

/**
 * @type {Intl.NumberFormat}
 */
const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
});
const builder = {
    createItem: (a, b, c, d, e, f, g, h) => {
        return {
            id: a,
            maxamount: b,
            amount: c,
            price: d,
            purchases_num: e,
            CoinType: f,
            name: g,
            description: h
        };
    }
};
let cart = {
    items: [], addCoupon: async (CouponID) => {
        let coupon = cart.getCoupon(CouponID);
        await console.log(coupon);
    }, getCoupon: async (CouponID) => {
        let r;
        await a1("/api/Coupon.php", {
            a: CouponID, b: ai
        }, async (e) => {
            r = e;
        }, console.log);
        return r;
    }, AddItem: async (_ItemID) => {
        if (!cart.items.hasOwnProperty(_ItemID)) {
            let item = await cart.getItem(_ItemID);
            if (!cart.items.hasOwnProperty(item.b)) cart.items[item.b] = builder.createItem(item.b, item.e, item.c, item.g, item.h, item.i, item.f, item.d);
        } else {
            await cart.IncreaseItem(_ItemID);
        }
        await UI.refeshCart();
    }, DelItem: async (_ItemID) => {
        if (cart.items.hasOwnProperty(_ItemID)) {
            delete cart.items[_ItemID];
        }
        await UI.refeshCart();
    }, IncreaseItem: async (_ItemID) => {
        if (cart.items.hasOwnProperty(_ItemID)) {
            cart.items[_ItemID]["amount"]++;
            await UI.refeshCart();
        } else {
            await cart.AddItem(_ItemID);
        }
    }, DecreaseItem: async (_ItemID) => {
        if (cart.items.hasOwnProperty(_ItemID) && cart.items[_ItemID]["amount"] > 0) {
            cart.items[_ItemID]["amount"]--;
            if (cart.items[_ItemID]["amount"] === 0) {
                await cart.DelItem(_ItemID);
            }
            await UI.refeshCart();
        } else {
            await cart.DelItem(_ItemID);
        }
    }, getItem: async (_ItemID) => {
        let r;
        await a1("/api/shop.php", {
            a: _ItemID, b: ci
        }, async (e) => {
            r = e;
            ci = r.a;
        }, await console.log);
        return r;
    },
};
let flag_init_complete_html = false;
let angles_bar = false;
let UI = {
    init: async () => {
        if (!flag_init_complete_html) {
            flag_init_complete_html = true;
            await $jq(".complete").hide().slideUp(500);
        }
        await $jq(".angles-bar").on("click", async () => {
            await $jq(".angles-bar").css({"visibility": "hidden"});
            await $jq(".concise").fadeOut(0);
            await $jq(".complete").slideDown(500);
        });
        await $jq(".cart-btn").on("click", async () => {
            await $jq(".angles-bar").css({"visibility": "hidden"});
            await $jq(".concise").fadeOut(0);
            await $jq(".complete").slideDown(500);
        });
        await $jq(".cart-btn-off").on("click", async () => {
            await $jq(".complete").slideUp(500);
            setTimeout(async () => {
                await $jq(".concise").slideDown(300);
                await $jq(".angles-bar").css({"visibility": "unset"});
            }, 450)
        });
    }, refeshCart: async () => {
        //await console.log("refeshCart");
        let price = 0.00;
        let amount = 0;
        for (let key in cart.items) {
            amount += cart.items[key]["amount"];
            price += cart.items[key]["price"] * cart.items[key]["amount"];
        }
        let temp = concise_html;
        temp = temp.replaceAll("%cart_amout%", amount);
        temp = temp.replaceAll("%coupon_html%", concise_coupon_failed_html);
        temp = temp.replaceAll("%price%", USDollar.format(price));
        let temp1 = "";

        for (let key in cart.items) {
            let temp2 = cart_item;
            temp2 = temp2.replaceAll("%ItemID%", cart.items[key]["id"]);
            temp2 = temp2.replaceAll("%name%", cart.items[key]["name"]);
            temp2 = temp2.replaceAll("%description%", cart.items[key]["description"]);
            temp2 = temp2.replaceAll("%price%", USDollar.format(cart.items[key]["price"]) + " &times; " + cart.items[key]["amount"]);
            temp1 += temp2;
        }
        await $jq("#total-amount").html("總共有 " + amount + " 個");
        await $jq("#total-price").html(USDollar.format(price));
        await $jq(".concise").html(temp);
        await $jq(".complete .item-list").html(temp1);
        await UI.init();
    }
};
let cart_item = "" + "<li class=\"list-group-item hstack\">\n" + "    <button type=\"button\" class=\"btn btn-outline-warning rounded-pill\" onclick=\"cart.DelItem('%ItemID%')\">&times;</button>\n" + "    <div class=\"item-detail-list\">\n" + "        <span class=\"ms-4 text-truncate item-name\">%name%</span>\n" + "        <span class=\"ms-4 item-detail\">%description%</span>\n" + "    </div>\n" + "    <div class=\"ms-3 price\">%price%</div>\n" + "</li>";
let concise_coupon_failed_html = "<a class=\"link-danger\">無套用優惠 <i class=\"fa-regular fa-circle-xmark\"></i></a>";
let concise_coupon_success_html = "<a class=\"link-success\">已套用優惠 <i class=\"fa-solid fa-hand-holding-dollar\"></i></a>";
let concise_html = "" + "<button type=\"button\" class=\"cart-btn btn btn-outline-warning rounded-pill animate__animated animate__pulse\">\n" + "    <i class=\"fa-solid fa-cart-shopping\"></i>\n" + "</button>\n" + "<div class=\"cart-info ms-4\">\n" + "    <li title=\"這是你現在選購的數量!\" class=\"link-primary text-truncate\">購物車有 %cart_amout% 個商品</li>\n" + "    <li title=\"這是你現在套用的優惠卷\" class=\"text-truncate\">%coupon_html%</li>\n" + "</div>\n" + "<div title=\"這是顯示金額的地方，只有計算現金購買的商品。\" class=\"price ms-4 link-warning text-truncate\">\n" + "    NTD %price%\n" + "</div>";

$jq(document).ready(function () {
    lightbox.option({
        'resizeDuration': 200, 'wrapAround': true, 'disableScrolling': true
    })
    $jq('.image-preview').lazyload();
    UI.init();
});