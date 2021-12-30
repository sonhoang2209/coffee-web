import React from 'react'

export default function Funtions() {
    return (
        <div>
            
        </div>
    )
}

export const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
  
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    // return { width };
    if(width > 1024) {
        return true
    } else {
        return false
    }
};
