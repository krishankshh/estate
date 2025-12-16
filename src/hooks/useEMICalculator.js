import { useState, useMemo } from 'react';

/**
 * Custom hook for EMI (Equated Monthly Installment) calculations
 */
export const useEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000); // ₹50 lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenure, setTenure] = useState(20); // 20 years default

  // Calculate monthly EMI using the formula: 
  // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculations = useMemo(() => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfMonths = tenure * 12;

    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
                (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);

    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - principal;

    return {
      monthlyEMI: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principalAmount: principal,
      principalPercentage: (principal / totalAmount) * 100,
      interestPercentage: (totalInterest / totalAmount) * 100
    };
  }, [loanAmount, interestRate, tenure]);

  return {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    tenure,
    setTenure,
    calculations
  };
};
