import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { BufferAttribute, Color } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const FloatIsland = () => {
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/floating_island.glb"
    );
    useEffect(() => {
        if (!gltf) return;
        let mesh = gltf.scene.children[0];

        // не до конца понятно, но по идее тут достается элемент
        // который отвечает за эффект запекания/закопчения острова
        // и помещаем его в атрибут three js чтоб управлять им
        var uvs = mesh.geometry.attributes.uv.array;
        mesh.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));
        // после чего заменяю карту освещения
        mesh.material.lightMap = mesh.material.map;
        // повышаю интенсивность свечения
        mesh.material.lightMapIntensity = 400;
        // накладываю на материал тёмный цвет чтобы покрыть
        // свечение черным цветом и получить красивую "текстурку"
        mesh.material.color = new Color(0.04, 0.06, 0.1);
    }, [gltf]);
    return <primitive object={gltf.scene} />;
};
