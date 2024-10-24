import React from "react";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";

function Gradient() {
  return (
    <ShaderGradientCanvas>
      <ShaderGradient
        enableTransition={false}
        animate="on"
        brightness={1}
        cAzimuthAngle={180}
        cDistance={2.8}
        cPolarAngle={80}
        cameraZoom={9.1}
        color1={"#606080"}
        color2={"#8319c1"}
        color3={"#4f0a83"}
        envPreset="city"
        // check
        grain="on"
        lightType="3d"
        positionX={0}
        positionY={0}
        positionZ={0}
        reflection={0.1}
        rotationX={50}
        rotationY={0}
        rotationZ={-60}
        shader="defaults"
        type="waterPlane"
        uAmplitude={0}
        uDensity={1.6}
        uFrequency={0}
        uSpeed={0.3}
        uStrength={1.7}
        uTime={8}
        wireframe={false}
        zoomOut={false}
      />
    </ShaderGradientCanvas>
  );
}

export default Gradient;
