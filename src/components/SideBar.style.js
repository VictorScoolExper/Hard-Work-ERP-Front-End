import styled from "styled-components";
import {
  MenuItem,
} from "react-pro-sidebar";


export const EncapsulatedMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const BottomButton = styled(MenuItem)`
  position: absolute;
  bottom: 0;
  left: 0; /* You can also use 'right: 0' to stick the button to the bottom right */
  margin: 1rem;
`;

