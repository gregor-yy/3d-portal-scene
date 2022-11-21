import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
} from "@react-three/drei";
import { Suspense } from "react";

import { FloatIsland } from "../FloatIsland";

export const SceneContainer = () => {
    return (
        <Suspense fallback={null}>
            <Environment
                background={"only"}
                files={process.env.PUBLIC_URL + "textures/bg.hdr"}
            />
            <Environment
                background={false}
                files={process.env.PUBLIC_URL + "textures/envmap.hdr"}
            />
            <PerspectiveCamera
                makeDefault
                fov={50}
                position={[-1.75, 10.05, 20.35]}
            />
            <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5} />
            <FloatIsland />
        </Suspense>
    );
};
