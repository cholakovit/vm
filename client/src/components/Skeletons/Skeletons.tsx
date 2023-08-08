// Functional Component
import React, { FC } from "react";

// Styled Elements
import { SkeletonBox } from "./Skeletons.styles";

// MUI Elements
import { Skeleton } from "@mui/material";

// Types
import type { SkeletonProps } from '../../types';

const Skeletons: FC<SkeletonProps> = ({ flag, width, height }) => {

  const items = [];
  for (let i = 0; i < 24; i++) {
    // Replace this with the actual content you want to render in the loop
    items.push(
      <SkeletonBox data-testid='skeletons'>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={width}
          height={height}
        />
      </SkeletonBox>
    );
  }

  return (
    <>
      {
        {
          1: (
            <>
              {items}
            </>
          ),
          2: (
            <>
              <SkeletonBox data-testid='skeletons'>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={width}
                  height={height}
                />
              </SkeletonBox>
            </>
          )
        }[flag]
      }
    </>
  );
};

export default Skeletons;


