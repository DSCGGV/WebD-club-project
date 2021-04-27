NAMES = ["voice", "speed", "presentation", "communication", "interest", "knowledge", "assessible", "simulation", "encourage", "puntual", "overall"];

let boxes = document.querySelectorAll('form .feedback-form-box');

boxes.forEach((element, index) => {
    element.innerHTML += make_options(index+1, NAMES[index]);
});

function make_options(i, name)
{
    let options = `<div class="options"> 
                        <span>
                            <label for="one${i}">Very Good</label>
                            <input type="radio" id="one${i}" name="${name}" value="4">
                        </span>
                        <span>
                            <label for="two${i}">Good</label>
                            <input type="radio" id="two${i}" name="${name}" value="3">
                        </span>
                        <span>
                            <label for="three${i}">Satisfactory</label>
                            <input type="radio" id="three${i}" name="${name}" value="2">
                        </span>
                        <span>
                            <label for="four${i}">Unsatisfactory</label>
                            <input type="radio" id="four${i}" name="${name}" value="1">
                        </span>
                    </div>`;

    return options;
}

$(function(body)
{

    $('form').hide();

    $('.teacher-box>h2').before().click(function()
    {
        console.log("This is clicked");
        $(this).parent().children('form').slideToggle();
    })

})
