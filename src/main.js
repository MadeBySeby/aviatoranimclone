import {
  Application,
  Assets,
  Sprite,
  Graphics,
  Container,
  Triangle,
  Text,
} from "pixi.js";
import { io } from "socket.io-client";
import { gsap } from "gsap";
(async () => {
  const app = new Application();

  await app.init({ background: "black", resizeTo: window });

  document.getElementById("pixi-container").appendChild(app.canvas);
  const URL = "https://mw.artwear.ge";
  let gameEvents = null;
  const socket = io(URL, {
    transports: ["websocket"],
    secure: true,
  });

  await Assets.load([
    {
      alias: "background",
      src: "/assets/background.svg",
    },
    {
      alias: "plane-0",
      src: "https://aviator-demo.spribegaming.com/assets/images/canvas/plane/spribe/plane-0.svg",
    },
    {
      alias: "plane-1",
      src: "https://aviator-demo.spribegaming.com/assets/images/canvas/plane/spribe/plane-1.svg",
    },
    {
      alias: "plane-2",
      src: "https://aviator-demo.spribegaming.com/assets/images/canvas/plane/spribe/plane-2.svg",
    },
    {
      alias: "plane-3",
      src: "https://aviator-demo.spribegaming.com/assets/images/canvas/plane/spribe/plane-3.svg",
    },
    {
      alias: "ufcxaviator",
      src: "/assets/ufcxaviator.svg",
    },
  ]);
  let roundEnd = false;
  let roundStarted = false;
  const background = Sprite.from("background");
  background.width = app.screen.width;
  background.height = app.screen.height;
  background.anchor.set(0.5);
  background.y = app.screen.height;
  background.scale.set(2);
  app.stage.addChild(background);
  const ufcxaviator = Sprite.from("ufcxaviator");
  ufcxaviator.anchor.set(0.5);
  ufcxaviator.x = app.screen.width / 2;
  ufcxaviator.y = app.screen.height / 2;
  ufcxaviator.scale.set(0.5);
  app.stage.addChild(ufcxaviator);
  const loadingContainer = new Container();
  const lineOfTime = new Graphics();
  lineOfTime.rect(0, 0.1, 0.1, 5).fill("red").round;
  lineOfTime.x = app.screen.width / 2 - ufcxaviator.width / 2 + 20;
  lineOfTime.y = app.screen.height / 2 + ufcxaviator.height / 2 + 20;
  loadingContainer.addChild(lineOfTime);
  loadingContainer.addChild(ufcxaviator);
  app.stage.addChild(loadingContainer);
  const multiplierText = new Text({
    text: "".toString(),
    style: {
      fontSize: 36,
      fill: "#ffffff",
      fontFamily: "Arial",
      align: "center",
    },
  });
  const lineOfTimeAnim = gsap.from(lineOfTime, {
    // delay: 1,
    duration: 0.1,
    width: ufcxaviator.width,
    ease: "none",
    onComplete: () => {
      app.stage.removeChild(loadingContainer);
      app.stage.addChild(planeContainer);
      gsap.to(plane0, {
        x: app.screen.width * 2,
        y: plane0.y,
        duration: 5,
        ease: "power1.out",
        onComplete: () => {
          // plane0.x = 0;
          // plane0.y = app.screen.height - plane0.height / 2;
          return;
        },
      });
      if (lineOfTimeAnim.paused()) return;
      const planeAnim = gsap.to(plane0, {
        x: app.screen.width - 200,
        y: 100,
        duration: 2,
        ease: "linear",

        onUpdate: () => {
          // const planeLeft = plane0.x - plane0.width / 2;
          // const planeRight = plane0.x + plane0.width / 2;
          // const planeTop = plane0.y - plane0.height / 2;
          // const planeBottom = plane0.y + plane0.height / 2;
          const plane0x = plane0.x;
          const plane0y = plane0.y;
          const plane0Width = plane0.width;
          graphics.clear();

          graphics.moveTo(0, app.screen.height);
          graphics.quadraticCurveTo(
            plane0x * 0.3,
            app.screen.height - 20,
            plane0x - plane0Width / 2,
            plane0y + 30
          );
          graphics.lineTo(plane0x, app.screen.height);
          graphics.lineTo(0, app.screen.height);
          graphics.fill({ color: 0xff0000, alpha: 0.5 });

          graphics.moveTo(0, app.screen.height);
          graphics.quadraticCurveTo(
            plane0x * 0.3,
            app.screen.height - 20,
            plane0x - plane0Width / 2,
            plane0y + 30
          );
          graphics.stroke({ color: 0xff0000, width: 3 });

          graphics.y = 0;
          graphics.x = 0;

          if (plane0.x >= app.screen.width - 300) {
            gsap.to(plane0, {
              x: app.screen.width - 200,
              y: 200 - Math.sin(Math.PI) * 50,
              duration: 5,
              ease: "linear",
              onUpdate: () => {
                graphics.y = plane0.y - 100;
                if (roundEnd) {
                  multiplierText.text = "Game Over";
                  multiplierText.style.fill = "red";
                  gsap.to(plane0, {
                    x: app.screen.width * 2,
                    y: plane0.y,
                    duration: 1,
                    ease: "power1.out",
                    // onComplete: () => {
                    //   airplane.x = 0;
                    //   airplane.y = app.screen.height - airplane.height / 2;
                    //   return;
                    // },
                    onComplete: () => {
                      // gsap.killTweensOf(plane0);
                      // planeAnim.kill();
                      plane0.x = 0;
                      plane0.y = app.screen.height - plane0.height / 2;
                      graphics.clear();
                      console.log("Round ended, animation stopped");
                      app.stage.removeChild(planeContainer);
                      app.stage.addChild(loadingContainer);
                      lineOfTimeAnim.play(0);
                    },
                  });
                }
              },

              // onComplete: () => {
              //   plane0.x = 0;
              //   plane0.y = app.screen.height - plane0.height / 2;
              //   graphics.clear();
              //   console.log("Animation complete");
              //   planeAnim.kill();
              //   app.stage.removeChild(planeContainer);
              //   app.stage.addChild(loadingContainer);
              //   lineOfTimeAnim.restart();
              // },
            });
          }
        },
      });
    },
  });
  lineOfTimeAnim.play();
  // const multiplierText = new Text({
  //   text: "".toString(),
  //   style: {
  //     fontSize: 36,
  //     fill: "#ffffff",
  //     fontFamily: "Arial",
  //     align: "center",
  //   },
  // });
  let countdownStarted = false;
  multiplierText.x = app.screen.width / 2;
  multiplierText.y = app.screen.height / 2;
  socket.on("GAME_EVENTS", (e) => {
    const parsedData = JSON.parse(e);
    console.log(parsedData);
    multiplierText.text = parsedData.multiplier
      ? parsedData.multiplier.toString()
      : "";
    gameEvents = parsedData;
    if (parsedData.type === "COUNTDOWN") {
      countdownStarted = true;
    }
    if (parsedData.type === "ROUND_END") {
      console.log(parsedData);
      roundEnd = true;
      roundStarted = false;
    } else if (parsedData.type === "ROUND_START") {
      countdownStarted = false;
      roundStarted = true;
      console.log("Round started");
      roundEnd = false;
    }
  });
  const planeContainer = new Container();
  planeContainer.addChild(multiplierText);
  const graphics = new Graphics();
  planeContainer.addChild(graphics);
  const plane0 = Sprite.from("plane-0");
  planeContainer.addChild(plane0);
  plane0.anchor.set(0.5);
  plane0.x = 0;
  plane0.y = app.screen.height - plane0.height / 2;

  graphics.x = plane0.x;
  graphics.y = app.screen.height * 0.9;
  // planeContainer.x = 0;
  // planeContainer.y = app.screen.height - plane0.height;
  // plane0.x += plane0.width / 4;
  plane0.scale.set(1);
  // app.stage.addChild(plane0);
  app.ticker.add((time) => {
    // if (countdownStarted) {
    //   lineOfTimeAnim.play();
    // } else {
    //   lineOfTimeAnim.progress(0);
    // }
    // background.rotation += 0.01 * time.deltaTime;
    // setTimeout(() => {
    //   lineOfTime.width += 0.1 * time.deltaTime;
    //   console.log("s");
    // }, 1000);
  });
})();
