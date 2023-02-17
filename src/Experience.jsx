import { Center, Float, OrbitControls, Text3D } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useRef, useMemo } from 'react'
import { CuboidCollider, Physics, RigidBody, InstancedRigidBodies } from '@react-three/rapier'


export default function Experience() {
    const glowText = useRef();
    const cubesCount = 100;
    const cubes = useRef();

    const cubesTransforms = useMemo(() => {
        const positions = [];
        const rotations = [];
        const scales = [];

        for(let i = 0; i < cubesCount; i++){
            positions.push([
                (Math.random()) * 8,
                6 + i * 0.2,
                (Math.random()) * 8
            ]);
            rotations.push([0,0,0]);
            scales.push([1,1,1]);
        }
        return {positions, rotations, scales}
    }, []);
    // const mobile = 0.6;
    // if(window.innerWidth < 600){
    //     mobile = 0.3;
    // }

    const handleClick = (e) => {

        window.location.href = 'https://twitter.com/midpaqjack'
    }
    const handleClick2 = (e) => {

        window.location.href = 'https://github.com/JackYouk/devweek-r3f'
    }

    document.body.addEventListener('click', () => {
        glowText.current.material.emissive.b = Math.random() + 1
        glowText.current.material.emissive.g = Math.random() + 1
        glowText.current.material.emissive.r = Math.random() + 1

        cubes.current.material.emissive.b = Math.random() + 1
        cubes.current.material.emissive.g = Math.random() + 1
        cubes.current.material.emissive.r = Math.random() + 1
    });

    return <>
        <color args={['#000000']} attach='background' />
        <EffectComposer>
            <Bloom mipmapBlur />
        </EffectComposer>

        <OrbitControls makeDefault />

        <Float>
            <Center>
                <Text3D
                    ref={glowText}
                    font='./helvetiker_regular.typeface.json'
                    scale={window.innerWidth < 600 ? 0.25 : 0.6}
                    curveSegments={12}
                    height={0.1}
                >
                    Developer Week 2023
                    <meshStandardMaterial
                        toneMapped={false}
                        // color={[1.5, 1, 4]} 
                        color='white'
                        emissive='white'
                        emissiveIntensity={3}
                    />
                </Text3D>
            </Center>
        </Float>

        <Float>
            <Center position-y={-2.5}>
                <Text3D
                    font='./helvetiker_regular.typeface.json'
                    scale={window.innerWidth < 600 ? 0.1 : 0.2}
                    onClick={handleClick}
                    curveSegments={12}
                    height={0.1}
                >
                    Built By jackJack
                    <meshStandardMaterial
                        toneMapped={false}
                        // color={[1.5, 1, 4]} 
                        color='white'
                        emissive='white'
                        emissiveIntensity={3}
                    />
                </Text3D>
                <Text3D
                    font='./helvetiker_regular.typeface.json'
                    scale={window.innerWidth < 600 ? 0.1 : 0.2}
                    onClick={handleClick2}
                    curveSegments={12}
                    height={0.1}
                >
                    Click me 4 the Github repo
                    <meshStandardMaterial
                        toneMapped={false}
                        // color={[1.5, 1, 4]} 
                        color='white'
                        emissive='white'
                        emissiveIntensity={3}
                    />
                </Text3D>
            </Center>
        </Float>

        <Physics gravity={[0, -0.6, 0]}>
            <RigidBody type='fixed'>
                <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
                <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, - 5.5]} />
                <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
                <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
            </RigidBody>

            <InstancedRigidBodies
                positions={cubesTransforms.positions}
                rotations={cubesTransforms.rotations}
                scales={cubesTransforms.scales}
            >
                <instancedMesh ref={cubes} castShadow args={[null, null, cubesCount]}>
                    <torusGeometry />
                    <meshStandardMaterial
                        toneMapped={false}
                        color='white'
                        emissive='white'
                        emissiveIntensity={3}
                        wireframe
                    />      
                </instancedMesh>
            </InstancedRigidBodies>
        </Physics>

    </>
}