import {
  Application,
  Assets,
  Sprite,
  Graphics,
  Container,
  Triangle,
} from "pixi.js";
import { gsap } from "gsap";
(async () => {
  const app = new Application();

  await app.init({ background: "black", resizeTo: window });

  document.getElementById("pixi-container").appendChild(app.canvas);
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
  lineOfTime.rect(0, 0.1, 0.1, 5).fill("red");
  lineOfTime.x = app.screen.width / 2 - ufcxaviator.width / 2 + 20;
  lineOfTime.y = app.screen.height / 2 + ufcxaviator.height / 2 + 20;
  loadingContainer.addChild(lineOfTime);
  loadingContainer.addChild(ufcxaviator);
  app.stage.addChild(loadingContainer);
  const lineOfTimeAnim = gsap.from(lineOfTime, {
    // delay: 1,
    duration: 5,
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
          plane0.x = 0;
          plane0.y = app.screen.height - plane0.height / 2;
          return;
        },
      });
      // gsap.to(planeLine, {
      //   x: app.screen.width - 200,
      //   y: -100,
      //   duration: 5,
      //   ease: "power1.out",
      //   onUpdate: () => {
      //     // planeLine.x =
      //     //   app.screen.width - 200 + Math.cos(Date.now() / 1000) * 50;
      //     // planeLine.width += Math.sin(2 * app.ticker.deltaTime);
      //   },
      //   onComplete: () => {
      //     planeLine.width = 0;
      //     planeLine.x = 0;
      //     planeLine.y = app.screen.height - plane0.height / 2;
      //     return;
      //   },
      // });
      gsap.to(plane0, {
        x: app.screen.width - 200,
        y: 100,
        duration: 2,
        ease: "linear",

        onUpdate: () => {
          if (plane0.x >= app.screen.width - 300) {
            gsap.to(plane0, {
              x: app.screen.width - 200,
              y: 100 - Math.sin(Date.now() / 500) * 50,
              duration: 1,
              ease: "linear",
            });
          }
        },
      });
    },
  });
  const planeContainer = new Container();
  // const planeLine = new Graphics();
  // planeLine.moveTo(0, 0);
  // planeLine.arc(app.screen.width / 2, app.screen.height - 150, 40, Math.PI, 0);
  // planeLine.stroke({ width: 3, color: 0x00ff00 });
  // planeLine.x = 0;
  // planeLine.y = app.screen.height - plane0.height / 2;
  // planeContainer.addChild(planeLine);
  const plane0 = Sprite.from("plane-0");
  planeContainer.addChild(plane0);
  plane0.anchor.set(0.5);
  plane0.x = 0;
  plane0.y = app.screen.height - plane0.height / 2;
  // planeContainer.x = 0;
  // planeContainer.y = app.screen.height - plane0.height;
  // plane0.x += plane0.width / 4;
  plane0.scale.set(1);
  // app.stage.addChild(plane0);
  app.ticker.add((time) => {
    background.rotation += 0.01 * time.deltaTime;
    // setTimeout(() => {
    //   lineOfTime.width += 0.1 * time.deltaTime;
    //   console.log("s");
    // }, 1000);
  });
})();
