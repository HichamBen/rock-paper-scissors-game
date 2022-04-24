const items = ["paper", "rock", "scissors"];
let color; // The color surrounding the element.
let score = 0;
let item_holder = $(".main>div"); // div that hold item in picker stage.
let close_icon = $("[alt=icon-close]"); // Close icon for the rules card.

play();

// Button of rules card.
$("footer>button").click(function () {
  $(".rules").css("display", "block");
});

// Close the rules card.
close_icon.click(() => {
  $(".rules").css("display", "none");
});

function play() {

  /* 
   1- Pick item by click on it and render it on match stage by renderMatch() function.
   2- Make a random picked for computer. then render it after 1 second.
   3- Compare the items picked by you and computer, if items is equal rerender picked page by
      render_PickedPage() function else make the winner item surrounded by gradient color,
      and show the result message.  */

  item_holder.click(function (e) {
    // Step 1:
    renderMatch(e);

    // Step 2:
    let randomItem = Math.floor(Math.random() * 3);
    const off = setTimeout(() => {
      $("#house-picked").removeClass("befor-picked");
      $("#house-picked").append(`<img src="./public/images/icon-${items[randomItem]}.svg" alt="icon-${items[randomItem]}">`)

      // Add the color surrounded the item.
      $("#house-picked").addClass(`${items[randomItem]}-active`);

      // Step 3:
      if (e.target.id === items[randomItem]) {
        const delay = setTimeout(() => {
          render_PickedPage();
          clearTimeout(delay);
        }, 1000);
        
      } else if ((e.target.id === "paper" && items[randomItem] === "rock") || (e.target.id === "scissors" && items[randomItem] === "paper") || (e.target.id === "rock" && items[randomItem] === "scissors")) {
        $(".result").css("display", "block"); // Showing the result.
        $("#your-picked > div").fadeIn();
        score++;
      } else {
        $(".result > h1").text("You lose");
        $(".result").css("display", "block"); // Showing the result.
        $("#house-picked > div").fadeIn();
        score--;
      }
      // Render score.
      $(".score>span").text(score);

      // Play again button. 
      $(".result > button").click(function () {
        render_PickedPage();
      });
      clearTimeout(off)
    }, 1000)

  });
}

// Render the page when the match will be playing.
function renderMatch(event) {
  $("main").removeClass("main");
  $("main").html(`<main class="match">
    <div class="players-side">
      <h3>You Picked</h3>
      <div id="your-picked" class="item-picked">
        <img src="./public/images/icon-${event.target.id}.svg" alt="icon-${event.target.id}">
        <div class="winner"></div>
      </div>
    </div>
    <div>

      <div class="result">
        <h1>You Win</h1>
        <button>Play Again</button>
      </div>

    </div>
    <div class="players-side">
      <h3>The House Picked</h3>
      <div id="house-picked" class="item-picked befor-picked">
        <div class="winner"></div>
      </div>
    </div>
  </main>`)

  $(".winner").hide();

  // Showing the result after match complete.
  $(".result").css("display", "none");

  if (event.target.id === "rock") {
    color = "hsl(349, 70%, 56%)";
  } else if (event.target.id === "paper") {
    color = "hsl(230, 89%, 65%)";
  } else {
    color = "hsl(40, 84%, 53%)";
  }

  $("#your-picked").css("outline-color", color);

}

function render_PickedPage() {
  $("main").removeClass("match");
  $("main").html(`<main class="main">
    <img src="./public/images/bg-triangle.svg" alt="bg-triangle">
    <div id="scissors"><img src="./public/images/icon-scissors.svg" alt="icon-scissors"></div>
    <div id="paper"><img src="./public/images/icon-paper.svg" alt="icon-paper"></div>
    <div id="rock"><img src="./public/images/icon-rock.svg" alt="icon-rock"></div>
  </main>`)

  // Reassign elements for picked page (new DOM).
  item_holder = $(".main >div");
  close_icon = $("[alt=icon-close]");

  // Call play function to add events on this new elements in above.
  play();
};
