import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Heading from 'components/molecules/Heading/Heading';
import BillForm from 'components/organisms/BillForm/BillForm';
import PayersForm from 'components/organisms/PayersForm/PayersForm';
import ExpenseForm from 'components/organisms/ExpenseForm/ExpenseForm';
import SplitForm from 'components/organisms/SplitForm/SplitForm';
import { RouteEnum } from 'enums';

interface IStep {
  step: string;
  title: string;
  subtitle?: string;
  component: ReactNode;
}

const steps: IStep[] = [
  { step: '1', title: 'Wprowadź dane z rachunku', component: <BillForm /> },
  {
    step: '2',
    title: 'Wybierz osoby do podziału rachunku',
    component: <PayersForm />,
  },
  {
    step: '3',
    title: 'Wpisz kwotę wydaną na każdą osobę',
    component: <ExpenseForm />,
  },
  {
    step: '4',
    title: 'Podziel kwotę między osoby',
    component: <SplitForm />,
  },
];

function AddReceipt(): ReactElement {
  const params = useParams();
  const stepData = steps.find(({ step }) => params.step && step === params.step);

  if (!stepData) {
    return <Navigate to={RouteEnum.NOT_FOUND} replace />;
  }
  const { title, subtitle, component } = stepData;
  return (
    <>
      <Heading title={title} subtitle={subtitle} />
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {component}
      </Box>
    </>
  );
}

export default AddReceipt;
