import React from "react";
import { ScrollView } from "react-native";
import { Box, Text } from "../components";
import { TransactionItem } from "./TransactionItem";
import { ThemeName } from "../theme";

interface Transaction {
  id: string;
  amount: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  currentTheme: ThemeName;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  currentTheme,
}) => {
  return (
    <Box flex={1} paddingHorizontal="m" paddingBottom="s" marginTop={"l"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 8 }}
      >
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            amount={transaction.amount}
            date={transaction.date}
            currentTheme={currentTheme}
          />
        ))}
      </ScrollView>
    </Box>
  );
};
