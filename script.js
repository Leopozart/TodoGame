let completedTasks = 0

$("#add-btn").on("click", function(e) {
    const item = $("#new-item").val(); // is the value of an input (textfield)
    const difficulty = $("#difficulty").val(); //is the value of a select


    e.preventDefault()
    //code below validates if there has been an input or not
    if (item.trim() !== '' && difficulty !== '0') {
        $("#items").append(`<li data-difficulty="${difficulty}"> 
            ${item}
            <span class="points">${difficulty}</span>
        </li>`);

        $("#new-item").val("");
        $("#difficulty").val("0");

        
    } else {
        alert("Du måste ange ett värde")
    }
    
});

// is used to count total amount of points
function countPoints(difficulty) {
    let i = parseInt($(".elo").html())
    i += parseInt(difficulty)
    $(".elo").html(i)
    if(i >= 1 && i < 10){
        achievements("wow-great-job-buddy")
    } else if (i >= 10 && i < 20) {
        $(".level").html("1")
        achievements(1)
    } else if (i >= 20 && i < 30){
        $(".level").html("2")
        achievements(2)
    }
}

function achievements(level) {
    if ($("#level-" + level).length == 0) {
        if(level == 1) {
            alert('New achievement unlocked: "Basement dweller"')
            $("#badges").append(`<li id='level-${level}'>
                <img src="img/rat.png"/> 
                <h3>Basement dwelller</h3>
            </li>`)
        } else if(level == 2) {
            alert('New achievement unlocked: "On A Roll"')
            $("#badges").append(`<li id='level-${level}'>
                <img src="img/rat.png"/> 
                <img src="img/rat.png"/> 
                <h3>On A Roll</h3>
            </li>`)
        }else if(level == "wow-great-job-buddy") {
            alert('New achievement unlocked! "First step"')
            $("#badges").append(`<li id='level-${level}'>
                <img src="img/one.png"/> 
                <h3>First step</h3>
            </li>`)
        }
    }
}

// to remove an li and also call the countPoints funtion
$("#items").on("click", "li", function() {
    let li = $(this)
    let difficulty = li.data('difficulty')
    countPoints(difficulty)
    li.remove();
    
    completedTasks += 1
    $("#tasks-completed").html(completedTasks)
});