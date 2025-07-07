import React from 'react';
import { Box, PageTitle, TransactionList } from '../components';
import { useAppContext } from '../contexts/AppContext';

const sampleTransactions = [
  { id: '1', amount: '+ 100 xUSD', date: '17th June 2025' },
  { id: '2', amount: '- 25 xUSD', date: '15th June 2025' },
  { id: '3', amount: '+ 250 xUSD', date: '12th June 2025' },
  { id: '4', amount: '+ 75 xUSD', date: '10th June 2025' },
  { id: '5', amount: '- 50 xUSD', date: '8th June 2025' },
];

const HistoryScreen = () => {
  const { currentThemeName } = useAppContext();

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box paddingHorizontal="l" paddingTop="xxl" >
        <PageTitle title="Transaction History" />
      </Box>
      <TransactionList
        transactions={sampleTransactions}
        currentTheme={currentThemeName}
      />
    </Box>
  );
};

export default HistoryScreen; 