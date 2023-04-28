import React from 'react';
import styled from 'styled-components';

const WageCardWrapper = styled.div`
  width: 100%;
  margin: 20px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
`;

const WageCardHeader = styled.div`
  background-color: #0074d9;;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

const WageCardContent = styled.div`
  background-color: white;
  color: #0074d9;
  font-size: 36px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
`;

const WageCard = ({ wage }) => {
  return (
    <WageCardWrapper>
      <WageCardHeader>Wage Information</WageCardHeader>
      <WageCardContent>${wage}/hour</WageCardContent>
    </WageCardWrapper>
  );
};

export default WageCard;
