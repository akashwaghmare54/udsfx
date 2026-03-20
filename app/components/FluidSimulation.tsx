"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function FluidSimulation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1); // force black

    containerRef.current?.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const options = {
      type: THREE.HalfFloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    };

    const createRT = () =>
      new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        options
      );

    let velocityRT = createRT();
    let velocityRT2 = createRT();

    let dyeRT = createRT();
    let dyeRT2 = createRT();

    // ✅ CLEAR ALL BUFFERS (FIX RED ISSUE)
    [velocityRT, velocityRT2, dyeRT, dyeRT2].forEach((rt) => {
      renderer.setRenderTarget(rt);
      renderer.clear();
    });
    renderer.setRenderTarget(null);

    const mouse = new THREE.Vector2(0.5, 0.5);

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1 - e.clientY / window.innerHeight;
    });

    // BASE MATERIAL (DISPLAY)
    const baseMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uTexture;

        void main() {
          vec4 color = texture2D(uTexture, vUv);

          // clamp to avoid weird colors
          color.rgb = clamp(color.rgb, 0.0, 1.0);

          vec3 base = vec3(0.02, 0.02, 0.02);
          gl_FragColor = vec4(base + color.rgb, 1.0);
        }
      `,
    });

    // CURL (SWIRL)
    const curlShader = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uTime: { value: 0 },
      },
      vertexShader: baseMaterial.vertexShader,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;

        uniform sampler2D uTexture;
        uniform float uTime;

        void main() {
          vec2 vel = texture2D(uTexture, vUv).xy;

          float angle = sin(vUv.x * 10.0 + uTime) * cos(vUv.y * 10.0 + uTime);
          vec2 curl = vec2(-sin(angle), cos(angle));

          vel += curl * 0.0005;

          gl_FragColor = vec4(vel, 0.0, 1.0);
        }
      `,
    });

    // ADVECT (MOVE FLUID)
    const advectShader = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uVelocity: { value: null },
      },
      vertexShader: baseMaterial.vertexShader,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;

        uniform sampler2D uTexture;
        uniform sampler2D uVelocity;

        void main() {
          vec2 vel = texture2D(uVelocity, vUv).xy * 0.003;
          vec2 coord = vUv - vel;

          vec4 color = texture2D(uTexture, coord);

          // smooth fade
          color.rgb *= 0.985;

          gl_FragColor = vec4(clamp(color.rgb, 0.0, 1.0), 1.0);
        }
      `,
    });

    // SPLAT (MOUSE INK)
    const splatShader = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uMouse: { value: mouse },
      },
      vertexShader: baseMaterial.vertexShader,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;

        uniform sampler2D uTexture;
        uniform vec2 uMouse;

        void main() {
          vec4 color = texture2D(uTexture, vUv);

          float d = distance(vUv, uMouse);

          float splat = exp(-d * 30.0);

          // balanced gold (no red spike)
          vec3 gold = vec3(0.6, 0.5, 0.2);

          color.rgb += gold * splat * 0.06;

          gl_FragColor = vec4(clamp(color.rgb, 0.0, 1.0), 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), baseMaterial);
    scene.add(quad);

    const renderPass = (
      material: THREE.ShaderMaterial,
      target: THREE.WebGLRenderTarget
    ) => {
      quad.material = material;
      renderer.setRenderTarget(target);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
    };

    const animate = (t: number) => {
      const time = t * 0.001;

      // CURL
      curlShader.uniforms.uTexture.value = velocityRT.texture;
      curlShader.uniforms.uTime.value = time;
      renderPass(curlShader, velocityRT2);
      [velocityRT, velocityRT2] = [velocityRT2, velocityRT];

      // ADVECT
      advectShader.uniforms.uTexture.value = dyeRT.texture;
      advectShader.uniforms.uVelocity.value = velocityRT.texture;
      renderPass(advectShader, dyeRT2);
      [dyeRT, dyeRT2] = [dyeRT2, dyeRT];

      // SPLAT
      splatShader.uniforms.uTexture.value = dyeRT.texture;
      splatShader.uniforms.uMouse.value = mouse;
      renderPass(splatShader, dyeRT2);
      [dyeRT, dyeRT2] = [dyeRT2, dyeRT];

      // DISPLAY
      quad.material = baseMaterial;
      baseMaterial.uniforms.uTexture.value = dyeRT.texture;

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none bg-black"
    />
  );
}