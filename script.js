let completedTasks = 0

let darkMode = true

//Control of dark/lightmode
/*$("#light-mode").on("click", function() {
    $("body").attr("id", "light-theme")
    $(".todo-list, .achievements, .stats").attr("id", "light-colors")
    $("main").attr("id", "light-main")
    $("li").attr("id", "light-li")
    darkMode = false
})*/

//Adds Todos
$("#add-btn").on("click", function(e) {
    e.preventDefault()

    const item = $("#new-item").val(); // is the value of an input (textfield)
    const difficulty = $("#difficulty").val(); //is the value of a select

    //Validates input
    if (item.trim() !== '' && difficulty !== '0') {
        $("#items").append(`<li data-difficulty="${difficulty}"> 
            ${item}
            <span class="points">${difficulty}</span>
        </li>`);

        //Resets inputs
        $("#new-item").val("");
        $("#difficulty").val("0");

        //Darkmode on list items
        /*if (darkMode == false) {
            $("li").attr("id", "light-li")
        } else {
            $("li").attr("id", "dark-li")
        }*/
    } else {
        alert("Du måste ange ett värde")
    }
    
});

//Count total amount of points
function countPoints(difficulty) {
    let i = parseInt($(".elo").html())
    i += parseInt(difficulty)
    $(".elo").html(i)
    if(i >= 1 && i < 10){
        achievements("0")
    } else if (i >= 10 && i < 20) {
        $(".level").html("1")
        achievements(1)
    } else if (i >= 20 && i < 30){
        $(".level").html("2")
        achievements(2)
    }
}

//Achievements
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
                <img src="img/rollpng.png"/> 
                <h3>On A Roll</h3>
            </li>`)
        }else if(level == 0) {
            alert('New achievement unlocked! "First step"')
            $("#badges").append(`<li id='level-${level}'>
                <img src="img/one.png"/> 
                <h3>First step</h3>
            </li>`)
        }
    }
}

//Remove li and also call the countPoints funtion
$("#items").on("click", "li", function() {
    let li = $(this)
    let difficulty = li.data('difficulty')
    countPoints(difficulty)
    li.remove();
    
    completedTasks += 1
    $("#tasks-completed").html(completedTasks)
});

//Achievement popup
$(".achievements").on("click", "li", function() {
    let li = $(this)
    let title = li.find("h3").html()
    let img = li.find("img").attr("src")
    let id = li.attr("id")
    console.log(id)


    let lvlZero = "You completed your first task, congratulations! Keep it up."
    let lvlOne = "You have gained 10 elo! Don't stop now"
    let lvlTwo = "You have gained 20 elo! You are on fire!"

    if (id == "level-0"){
        $("#achievement-description").html(lvlZero)
    } else if (id == "level-1"){
        $("#achievement-description").html(lvlOne)
    } else if (id == "level-2"){
        $("#achievement-description").html(lvlTwo)
    }


    $(".popup").attr("id", "open")
    $(".main").attr("id", "blur")
    $("#achievement-title").html(title)
    $("#achievement-image").attr("src", img)
})

//Close achievement popup
$("#close").on("click",  function() {
    $(".popup").attr("id", "closed")
    $("main").attr("id", "un-blur")
})

