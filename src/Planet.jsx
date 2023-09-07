import * as THREE from "three";
import { useEffect } from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap';

function Planet() {
  useEffect(() => {
    //Scene
    const scene = new THREE.Scene();

    //Creating object (2 parts: 1st -> geometry & 2nd -> material)
    //Geometry - We can see other ones on Three.js website geometry section
    const geometry = new THREE.SphereGeometry(2, 64, 64); // 3: radius, 64's are width and hight segments.
    //Material
    const material = new THREE.MeshPhongMaterial({
      color: "#00ff83", // green
    });
    //We mesh them together to get the object.
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh); // We have to add all objects and actions to scene.

    //Sizes
    const sizes = {
      height: window.innerHeight,
      width: window.innerWidth
    }

    //Light
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 5, 5);
    pointLight.intensity = 25;
    scene.add(pointLight);

    //Camera - There are other options rather than PerspectiveCamera but the most used one is this.
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    //Camera arguments -> 45:Field of view, 800/600: Aspect ratio, 0.1 and 100: near and far clipping plane.
    // If object position is far from 100 unit or near more than 0.1 unit it disappear. Just tese 2 intervals shows the image
    camera.position.z = 10; // This will move camera out of the screen by 20 unit.
    scene.add(camera);

    //Render the scene by using canvas. In HTML file we add canvas and do some process on main.js also.
    const canvas = document.querySelector(".webgl");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height); // Define the canvas size.
    renderer.setPixelRatio(2) // more smooth scene, its default value is 1.

    // Render the scene and camera both.
    renderer.render(scene, camera);

    //OrbitControl - It allows us to control objects position, rotation etc...
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true; // More smooth camera movement
    controls.enablePan = false; // Disable the camera panning. 
    controls.enableZoom = false; // Disable the camera zoom.
    controls.autoRotate = true; // Enable the autorotate the camera.
    controls.autoRotateSpeed = 3; // Camera automatically rotate. 

    //Resize - Its important due to the different sizes of the windows.
    window.addEventListener('resize', () => {
      //update sizes for different size of the webpage
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      //update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix() // This will fix the destruction of shapes.

      //render with new sizes
      renderer.setSize(sizes.width, sizes.height)
    })

    //We have to make loop because when we change the size, the shape is decay, so we have to update changes in every second
    //Also we can do some animation in this loop.
    const loop = () => {
      renderer.render(scene, camera)
      window.requestAnimationFrame(loop) // loop function works in every frame. (In this pc, 120 times per second)
      mesh.rotation.x += 0.1;
      controls.update() // When we let the mouse, its not stop instantly, it stops slowly so we get more accurate seen.
    }

    loop();

    //Timeline - it synchronize multiple animations. We do this by using gsap
    const tl = gsap.timeline({defaults: {duration:1}}) // takes 1 second.
    tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1}, 0) // When we refresh website the object (mesh) scales from 0 (invisible) to 1 (default sizes) and it took 1 second.
    tl.fromTo('nav', {y: '-100%'}, {y:'0%'}, 1) // from -100% in y axis to 0% in y axis. We change the nav position.
    tl.fromTo('.spin-title', {opacity:0}, {opacity:1}, 1); // the end of the '0' means that they start the animation together.
    // Firstly the object scales in 1 second. After it finish, the other two will start and do their process in 1 second.


    // Mouse animation color
    let mouseDown = false;
    let rgb = []
    window.addEventListener('mousedown', () => (mouseDown=true))
    window.addEventListener('mouseup', () => (mouseDown=false))
    window.addEventListener('mousemove', (e) => {
      if (mouseDown) {
        rgb = [
          Math.round((e.pageX / sizes.width) * 255),
          Math.round((e.pageY / sizes.height) * 255),
          150
        ]
        // Animate it
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
        })
      }
    })

  }, []);

  return (
    <div>
      <canvas className="webgl" />
      <nav>
        <div className="nav-title">Sphere</div>
        <div>
          <ul className="nav-ulist">
            <a className="nav-link" href="/"><li className="nav-list">About</li></a>
            <a className="nav-link" href="/"><li className="nav-list">ThreeJs</li></a>
          </ul>
        </div>
      </nav>
      <h1 className="spin-title">Give it a spin</h1>
    </div>
  )
}

export default Planet;
