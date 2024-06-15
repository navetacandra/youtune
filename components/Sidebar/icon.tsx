import Link from "next/link";
import React, { ReactNode, useState } from "react";

function Icon({
  normal,
  hover,
  to,
}: {
  normal?: ReactNode;
  hover?: ReactNode;
  to: string;
}) {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <Link
      href={to}
      className='hover:scale-110 pointer block'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {!isHover ? normal : hover}
    </Link>
  );
}

export default Icon;
