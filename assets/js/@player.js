/**
 * @external jQuery ./jquery.3.7.0.js
 */
const $jq = jQuery.noConflict();

function f0(e, f, g) {
    const object = document.querySelector(e);
    const playername = object.value;

    $jq.ajax({
        url: '/api/player.php',
        type: 'POST',
        dataType: "json",
        data: {
            a: playername,
            b: f
        },
        success: function (response) {
            if (response['error'] !== undefined) {
                $jq('#error_message').text(response['error']);
            }
            if (response['b'] !== undefined && response['b'] !== "") {
                g(response['b']);
                $jq('#error_message').text("冷卻時間約 10 秒。");
            }
            console.log(response);
        },
        error: function (xhr, status, error) {
            // 請求失敗時的處理
            console.log(error);
        }
    });
}