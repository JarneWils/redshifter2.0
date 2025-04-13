import { useTexture } from "@react-three/drei";

export function useBlockTextures() {
  const groundTexture = useTexture("/images/grass-top.jpg");
  const grassSideTexture = useTexture("/images/grass-side.jpg");
  const amoBlockTexture = useTexture("/images/amoBlock.jpg");
  const healthBlockTexture = useTexture("/images/healthBlock.jpg");
  return {
    groundTexture,
    grassSideTexture,
	amoBlockTexture,
	healthBlockTexture,
  }
}
