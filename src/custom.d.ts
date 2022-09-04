/// declare a global rule that tells typescript what to import and export SVG as.

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// then include this file in tsconfig.json file
