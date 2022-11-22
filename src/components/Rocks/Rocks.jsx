import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Rocks = () => {
    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/rocks.glb"); // камни на острове
    return <primitive object={gltf.scene} />;
};
