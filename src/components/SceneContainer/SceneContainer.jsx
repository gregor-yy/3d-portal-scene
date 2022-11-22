import { OrbitControls, PerspectiveCamera, Environment, Float } from "@react-three/drei";
import { Suspense } from "react";
import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from "three";

import { EffectComposer, DepthOfField, HueSaturation, BrightnessContrast, ChromaticAberration, GodRays } from "@react-three/postprocessing";
import { BlendFunction, Resizer, KernelSize } from "postprocessing";

import { FloatIsland } from "../FloatIsland";
import { FloatRocks } from "../FloatRocks";
import { Portal } from "../Portal";
import { Rocks } from "../Rocks";
import { Trees } from "../Trees";
import { Text } from "../Text";
import { Grass } from "../Grass";
import { Particles } from "../Particles";

let lightColor = new Color(1, 0.2, 0.1);
let mesh = new Mesh(
    new CylinderGeometry(0.3, 0.3, 0.2, 20),
    new MeshBasicMaterial({
        color: lightColor,
        transparent: true,
        opacity: 1,
    })
);
mesh.rotation.x = Math.PI * 0.5;
mesh.position.set(1.17, 10.7, -4.1);
mesh.scale.set(1.5, 1, 1);

export const SceneContainer = () => {
    return (
        <Suspense fallback={null}>
            <Environment background={"only"} files={process.env.PUBLIC_URL + "textures/bg.hdr"} />
            <Environment background={false} files={process.env.PUBLIC_URL + "textures/envmap.hdr"} />
            <PerspectiveCamera makeDefault fov={50} position={[-1.75, 10.05, 20.35]} />
            <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5} />

            <Float speed={0.5} rotationIntensity={0.6} floatIntensity={0.6}>
                {/* свет от портала чтобы создать ощущение отражения от тропинки */}
                <spotLight
                    penumbra={1}
                    distance={500}
                    angle={60.65}
                    attenuation={1}
                    anglePower={3}
                    intensity={0.3}
                    color={lightColor}
                    position={[1.19, 10.85, -4.45]}
                    target-position={[0, 0, -1]}
                />
                <primitive object={mesh} />
                <Portal />
                <Trees />
                <Text />
                <Rocks />
                <Grass />
                <Particles />
                <FloatIsland />
            </Float>
            <FloatRocks />
            <EffectComposer stencilBuffer={true}>
                {/* глубина резкозки */}
                <DepthOfField focusDistance={0.012} focalLength={0.015} bokehScale={7} />
                {/* насыщенность цветов */}
                <HueSaturation hue={0} saturation={-0.15} />
                {/* контраст */}
                <BrightnessContrast brightness={0.0} contrast={0.035} />
                {/* аберрация */}
                <ChromaticAberration radialModulation={true} offset={[0.00175, 0.00175]} />
                {/* лучи */}
                <GodRays
                    sun={mesh}
                    blendFunction={BlendFunction.Screen}
                    samples={40} // количество лучей
                    density={0.97} // плотность
                    decay={0.97} // дальность рассеивания лучей
                    weight={0.6}
                    exposure={0.3} // яркость
                    clampMax={1}
                    width={Resizer.AUTO_SIZE}
                    height={Resizer.AUTO_SIZE}
                    kernelSize={KernelSize.SMALL}
                    blur={true} // размытие, если выключить наглядно можно увидеть поведение лучей
                />
            </EffectComposer>
        </Suspense>
    );
};
