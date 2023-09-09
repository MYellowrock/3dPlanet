import { useEffect } from "react";

function Commercial() {
  useEffect(() => {
    const card = document.querySelector(".card");
    const container = document.querySelector(".container");
    const title = document.querySelector(".ds-title");
    const dark_souls = document.querySelector(".dark-souls");
    const description = document.querySelector(".info h3");
    const sizes = document.querySelector(".games");
    const purchase = document.querySelector(".purchase");

    container.addEventListener("mousemove", (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25; // Adjust the divisor to control the rotation sensitivity
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    //animate in
    container.addEventListener("mouseenter", (e) => {
      card.style.transition = "none";
      //Popout
      title.style.transform = "translateZ(150px)";
      dark_souls.style.transform = "translateZ(100px)";
      description.style.transform = "translateZ(125px)";
      sizes.style.transform = "translateZ(100px)";
      purchase.style.transform = "translateZ(75px)";
    });

    //animate out
    container.addEventListener("mouseleave", (e) => {
      card.style.transition = "all 0.5s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      //Popback
      title.style.transform = "translateZ(0px)";
      dark_souls.style.transform = "translateZ(0px)";
      description.style.transform = "translateZ(0px)";
      sizes.style.transform = "translateZ(0px)";
      purchase.style.transform = "translateZ(0px)";
    });
  }, []);

  return (
    <div id="commercial" className="container">
      <div className="card">
        <div className="dark-souls">
          <div className="circle"></div>
          <img src="../ds.png" alt="ds" />
        </div>
        <div className="info">
          <h1 className="ds-title">DARK SOULS</h1>
          <h3>Dark Souls Warrior Character</h3>
          <div className="games">
            <button>DS 1</button>
            <button>DS 2</button>
            <button>DS 3</button>
          </div>
          <div className="purchase">
            <button>Purchase</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commercial;
