import { Text3D } from "@react-three/drei";
import { Float } from "@react-three/drei";

export const Text = () => {
    return (
        <>
            <Float rotationIntensity={0.36} floatIntensity={0.5} position={[3.75, 5.65, 0.75]} rotation={[0, -0.2, -0.05]}>
                <Text3D
                    font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"}
                    size={0.275} // размер
                    height={0.065} // толщина букв
                    curveSegments={12} // количесвто полигонов для отрисовки текста
                >
                    Grigory Zhidok
                    <meshStandardMaterial color={"rgb(255, 255, 255)"} emissive={"rgb(255, 255, 255)"} />
                </Text3D>
            </Float>
            <Float rotationIntensity={0.36} floatIntensity={0.5} position={[3.5, 6, 0]} rotation={[0, -0.35, -0.05]}>
                <Text3D font={process.env.PUBLIC_URL + "/fonts/Roboto_Regular.json"} size={0.475} height={0.065} curveSegments={12}>
                    Portal 3D Scene in the website
                    <meshStandardMaterial color={"rgb(255, 255, 255)"} emissive={"rgb(255, 255, 255)"} />
                </Text3D>
            </Float>
        </>
    );
};
