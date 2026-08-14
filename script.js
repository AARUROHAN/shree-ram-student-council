/* =========================================================
   THE SHRIRAM MILLENNIUM SCHOOL
   STUDENT COUNCIL PORTAL
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   HOUSE DATA
========================================================= */

const houses = [

    {
        name: "SHAURYA",
        points: 2450,
        color: "yellow"
    },

    {
        name: "PRATIBHA",
        points: 2210,
        color: "blue"
    },

    {
        name: "SHAKTI",
        points: 1980,
        color: "green"
    },

    {
        name: "PRATIGYA",
        points: 1850,
        color: "red"
    }

];


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");


const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle("open");

            const isOpen =
                mobileMenu.classList.contains("open");

            mobileMenuButton.textContent =
                isOpen ? "×" : "☰";

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

if (mobileMenu) {

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove("open");

                if (mobileMenuButton) {

                    mobileMenuButton.textContent = "☰";

                }

            }
        );

    });

}


/* =========================================================
   SCOREBOARD
========================================================= */

function updateScoreboard() {

    const cards =
        document.querySelectorAll(".score-card");


    if (!cards.length) {

        return;

    }


    const sortedHouses =
        [...houses].sort(
            (a, b) => b.points - a.points
        );


    sortedHouses.forEach(
        (house, index) => {

            const card =
                document.querySelector(
                    `[data-house="${house.name.toLowerCase()}"]`
                );


            if (!card) {

                return;

            }


            const pointsElement =
                card.querySelector(".house-points");


            if (pointsElement) {

                pointsElement.textContent =
                    house.points.toLocaleString("en-IN");

            }


            const rankElement =
                card.querySelector(".rank");


            if (rankElement) {

                const position =
                    index + 1;


                rankElement.className =
                    "rank";


                if (position === 1) {

                    rankElement.classList.add("first");

                    rankElement.innerHTML =
                        "<span>🥇</span> 1st";

                }

                else if (position === 2) {

                    rankElement.classList.add("second");

                    rankElement.innerHTML =
                        "<span>🥈</span> 2nd";

                }

                else if (position === 3) {

                    rankElement.classList.add("third");

                    rankElement.innerHTML =
                        "<span>🥉</span> 3rd";

                }

                else {

                    rankElement.classList.add("fourth");

                    rankElement.innerHTML =
                        "4th";

                }

            }

        }
    );


    updateLeaderMessage(sortedHouses);

}


/* =========================================================
   LEADER MESSAGE
========================================================= */

function updateLeaderMessage(sortedHouses) {

    const leader =
        sortedHouses[0];


    const second =
        sortedHouses[1];


    const leaderContent =
        document.querySelector(".leader-content");


    const pointsGap =
        document.getElementById("points-gap");


    if (!leader || !second) {

        return;

    }


    const gap =
        leader.points - second.points;


    if (leaderContent) {

        leaderContent.innerHTML = `

            <strong>
                ${leader.name} HOUSE
            </strong>

            IS LEADING THE CHAMPIONSHIP!

        `;

    }


    if (pointsGap) {

        pointsGap.textContent =
            `Only ${gap.toLocaleString("en-IN")}
             points separate
             ${leader.name.charAt(0) +
               leader.name.slice(1).toLowerCase()}
             & ${second.name.charAt(0) +
               second.name.slice(1).toLowerCase()}!`;

    }

}


/* =========================================================
   SCORECARD HOVER
========================================================= */

const scoreCards =
    document.querySelectorAll(".score-card");


scoreCards.forEach(card => {


    card.addEventListener(
        "mouseenter",
        function () {

            scoreCards.forEach(otherCard => {

                if (otherCard !== card) {

                    otherCard.style.opacity = "0.45";

                }

            });

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            scoreCards.forEach(otherCard => {

                otherCard.style.opacity = "1";

            });

        }
    );

});


/* =========================================================
   POINTS COUNT-UP ANIMATION
========================================================= */

function animatePoints() {

    const pointElements =
        document.querySelectorAll(".house-points");


    pointElements.forEach(element => {

        const target =
            Number(
                element.dataset.points
            );


        if (!target) {

            return;

        }


        let current = 0;


        const duration = 900;

        const start =
            performance.now();


        function update(time) {

            const progress =
                Math.min(
                    (time - start) / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            current =
                Math.floor(
                    target * eased
                );


            element.textContent =
                current.toLocaleString("en-IN");


            if (progress < 1) {

                requestAnimationFrame(update);

            }

            else {

                element.textContent =
                    target.toLocaleString("en-IN");

            }

        }


        requestAnimationFrame(update);

    });

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateScoreboard();

        setTimeout(
            animatePoints,
            300
        );

    }
);


/* =========================================================
   EVENT CARD HOVER
========================================================= */

const eventCards =
    document.querySelectorAll(".event-card");


eventCards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        function () {

            card.style.transform =
                "translateY(-4px)";

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform =
                "translateY(0)";

        }
    );

});


/* =========================================================
   PREVENT EMPTY SOCIAL LINKS FROM JUMPING
========================================================= */

const emptyLinks =
    document.querySelectorAll(
        '.socials a[href="#"]'
    );


emptyLinks.forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

        }
    );

});