// components/ClientOnly.tsx

import { ReactNode, useEffect, useState } from "react";

//delegated is not used yet
const ClientOnly = ({ children, ...delegated }: { children: ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
};

export default ClientOnly;
