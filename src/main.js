import {
  Application,
  Assets,
  Sprite,
  Graphics,
  Container,
  Triangle,
  Text,
  Texture,
} from "pixi.js";
import { BlurFilter } from "pixi.js";
import { GodrayFilter } from "@pixi/filter-godray";
import { io } from "socket.io-client";
import { gsap } from "gsap";
import { sound } from "@pixi/sound";
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
  const planeTextures = [
    Texture.from("plane-0"),
    Texture.from("plane-1"),
    Texture.from("plane-2"),
    Texture.from("plane-3"),
  ];
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
  sound.add("backgroundSound", "/assets/music/bg_music.mp3");
  // sound.add("plane-0", "/assets/music/sprite_audio.mp3");
  const appscreenWidth = app.screen.width;
  const appscreenHeight = app.screen.height;
  const baseUnit = appscreenHeight / 100;
  const multiplierText = new Text({
    text: "".toString(),

    style: {
      fontSize: appscreenHeight * 0.08,
      fill: "#ffffff",
      fontFamily: "Arial",
      align: "center",
    },
  });
  const gameEndText = new Text({
    text: "Flew away!",
    style: {
      fontSize: appscreenHeight * 0.04,
      fill: "#ffffff",
      fontFamily: "Arial",
      align: "center",
    },
  });
  sound.play("backgroundSound", {
    loop: true,
    volume: 0.5,
  });
  let currentFrame = 0;
  const frameSpeed = 0.1;
  const lineOfTimeAnim = gsap.from(lineOfTime, {
    // delay: 1,
    // duration: 0.1,s
    duration: 4.7,
    width: ufcxaviator.width,
    ease: "none",
    onComplete: () => {
      app.stage.removeChild(loadingContainer);
      // app.stage.addChild(planeContainer);
      app.stage.addChild(bettingContainer);
      bettingContainer.addChildAt(effectContainer, 0);
      // if (lineOfTimeAnim.paused()) return;
      const tl = gsap.timeline({ repeat: -1 });
      const planeAnim = tl
        .to(plane0, {
          x: appscreenWidth,
          y: -baseUnit * 8,
          duration: 4,
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
            const graphicCpx = plane0x * 0.3;
            const graphicCpy = appscreenHeight + appscreenHeight * 0.1;
            const graphicquadraticCurveToX = plane0x - plane0Width / 2;
            const graphicquadraticCurveToY = plane0y + plane0.height / 2;

            graphics.moveTo(0, appscreenHeight);
            graphics.quadraticCurveTo(
              graphicCpx,
              graphicCpy,
              graphicquadraticCurveToX,
              graphicquadraticCurveToY
            );
            graphics.lineTo(plane0x, appscreenHeight);
            graphics.lineTo(0, appscreenHeight);
            graphics.fill({ color: 0xff0000, alpha: 0.5 });

            graphics.moveTo(0, appscreenHeight);
            graphics.quadraticCurveTo(
              graphicCpx,
              graphicCpy,
              graphicquadraticCurveToX,
              graphicquadraticCurveToY
            );
            graphics.stroke({ color: 0xff0000, width: 3 });

            graphics.y = 0;
            graphics.x = 0;

            if (plane0.x > appscreenWidth - baseUnit * 19) {
              // console.log(animDuration);
              gsap.to(plane0, {
                x: appscreenWidth - baseUnit * 19,
                y: appscreenHeight * 0.6,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "back.inOut",
                onUpdate: () => {
                  graphics.clear();
                  const graphicCpx2 = plane0.x * 0.3;
                  const graphicCpy2 = appscreenHeight + appscreenHeight * 0.1;
                  const graphicquadraticCurveToX2 = plane0.x - plane0Width / 2;
                  const graphicquadraticCurveToY2 =
                    plane0.y + plane0.height / 2;
                  graphics.moveTo(0, appscreenHeight);
                  graphics.quadraticCurveTo(
                    graphicCpx2,
                    graphicCpy2,
                    graphicquadraticCurveToX2,
                    graphicquadraticCurveToY2
                  );
                  graphics.lineTo(plane0.x, appscreenHeight);
                  graphics.lineTo(0, appscreenHeight);
                  graphics.fill({ color: 0xff0000, alpha: 0.5 });

                  graphics.moveTo(0, appscreenHeight);
                  graphics.quadraticCurveTo(
                    graphicCpx2,
                    graphicCpy2,
                    graphicquadraticCurveToX2,
                    graphicquadraticCurveToY2
                  );
                  graphics.stroke({ color: 0xff0000, width: 3 });

                  graphics.y = 0;
                  graphics.x = 0;
                  // graphics.y = plane0y + plane0.height / 2;
                  if (roundEnd) {
                    effectContainer.addChild(gameEndText);
                    gameEndText.anchor.set(0.5);
                    gameEndText.x = multiplierText.x;
                    gameEndText.y =
                      multiplierText.y - multiplierText.height / 2 - 20;
                    multiplierText.style.fill = "red";
                    graphics.clear();

                    gsap.to(plane0, {
                      x: appscreenWidth * 2,
                      y: plane0.y,
                      duration: 1,
                      ease: "power1.out",
                      // onComplete: () => {
                      //   airplane.x = 0;
                      //   airplane.y = app.screen.height - airplane.height / 2;
                      //   return;
                      // },
                      onComplete: () => {
                        gsap.killTweensOf(plane0);
                        planeAnim.kill();

                        plane0.x = plane0.width;
                        plane0.y = app.screen.height - plane0.height / 2;
                        multiplierText.text = "";
                        multiplierText.style.fill = "#ffffff";
                        effectContainer.removeChild(gameEndText);
                        bettingContainer.removeChild(effectContainer);
                        graphics.clear();
                        bettingContainer.removeChild(graphics);
                        app.stage.removeChild(bettingContainer);
                        console.log("Round ended");
                        // app.stage.removeChild(multiplierText);
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
        })
        .to(
          {},
          {
            duration: 0.1,
            repeat: -1,
            onRepeat: () => {
              currentFrame = (currentFrame + 1) % planeTextures.length;
              plane0.texture = planeTextures[currentFrame];
            },
          },
          0
        );
    },
  });

  // lineOfTimeAnim.play();
  // const multiplierText = new Text({
  //   text: "".toString(),
  //   style: {
  //     fontSize: 36,
  //     fill: "#ffffff",
  //     fontFamily: "Arial",
  //     align: "center",
  //   },
  // });
  let animDuration = 0;
  let countdownStarted = false;
  let multiplier = 0;
  const effectContainer = new Container();

  multiplierText.anchor.set(0.5);
  multiplierText.x = app.screen.width / 2;
  multiplierText.y = app.screen.height / 2;
  socket.on("GAME_EVENTS", (e) => {
    const parsedData = JSON.parse(e);
    console.log(parsedData);
    multiplierText.text = parsedData.multiplier
      ? `${parsedData.multiplier.toString()}x`
      : "";
    multiplier = parsedData.multiplier || 0;
    animDuration = parsedData.multiplier || 0;
    gameEvents = parsedData;
    if (parsedData.type === "COUNTDOWN") {
      countdownStarted = true;
    }
    // if (parsedData.type === "TICK") {
    // }
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
  const bettingContainer = new Container();
  const planeContainer = new Container();

  // planeContainer.addChild(multiplierText);
  const graphics = new Graphics();
  planeContainer.addChild(graphics);
  const plane0 = Sprite.from(planeTextures[0]);
  planeContainer.addChild(plane0);
  plane0.anchor.set(0.5);
  plane0.x = 0;
  plane0.y = app.screen.height - plane0.height / 2;
  bettingContainer.addChild(planeContainer);
  // bettingContainer.addChild(multiplierText);
  graphics.x = plane0.x;
  graphics.y = app.screen.height * 0.9;
  // planeContainer.x = 0;
  // planeContainer.y = app.screen.height - plane0.height;
  // plane0.x += plane0.width / 4;
  plane0.scale.set(1);
  // app.stage.addChild(plane0);
  const canvas = document.createElement("canvas");
  canvas.width = appscreenWidth;
  canvas.height = appscreenHeight;
  const ctx = canvas.getContext("2d");

  const centerX = appscreenWidth / 2;
  const centerY = appscreenHeight / 2;
  const radius = Math.min(appscreenWidth, appscreenHeight) / 2;

  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    radius
  );
  gradient.addColorStop(0.001, "rgba(0, 140, 255, 0.8)");
  gradient.addColorStop(0, "rgba(0, 53, 167, 0.4)");
  gradient.addColorStop(1, "rgba(0, 47, 142, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, appscreenWidth, appscreenHeight);
  const gradientTexture = Texture.from(canvas);
  const lightSprite = Sprite.from(gradientTexture);

  lightSprite.width = app.screen.width;
  lightSprite.height = app.screen.height;
  lightSprite.anchor.set(0.5);
  lightSprite.x = app.screen.width / 2;
  lightSprite.y = app.screen.height / 2;

  effectContainer.addChild(lightSprite);
  effectContainer.addChild(multiplierText);
  bettingContainer.addChildAt(effectContainer, 0);
  app.ticker.add((time) => {
    // Calculate gradient color based on multiplier (smooth transition up to 2x)
    // Interpolate between two colors based on multiplier (1x = blue, 2x = orange)
    // 1x: rgba(0,140,255,0.8), 2x: rgba(255,140,0,0.8)
    // console.log("Multiplier is greater than 2, resetting to 2");
    if (multiplier >= 2 && !roundEnd) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient1 = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );
      gradient1.addColorStop(0.001, "rgba(147, 0, 211, 0.8)");
      gradient1.addColorStop(0, "rgba(186, 85, 211, 0.4)");
      gradient1.addColorStop(1, "rgba(75, 0, 130, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lightSprite.texture.baseTexture.update();
    }
    console.log(multiplier, "Multiplier is less than 2, resetting to 0");
    if (roundEnd) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lightSprite.texture.baseTexture.update();
    }
    if (multiplier < 2 || countdownStarted) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      lightSprite.texture.baseTexture.update();
    }

    if (countdownStarted) {
      lineOfTimeAnim.play();
    } else {
      lineOfTimeAnim.progress(0);
    }
    // background.rotation += 0.01 * time.deltaTime * 0.5;
    // setTimeout(() => {
    //   lineOfTime.width += 0.1 * time.deltaTime;
    //   console.log("s");
    // }, 1000);
  });
})();
