import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, Card } from '@mui/material';
import { NotificationManager } from 'react-notifications';

const AdvanceTaxCalculator = () => {
  const [income, setIncome] = useState('0');
  const [advanceTax, setAdvanceTax] = useState('');

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const calculateAdvanceTax = () => {
    const incomeInt = parseInt(income);
    if(incomeInt<1){
        return NotificationManager.error("income should be greather than 0 .")
    }

    // Income slabs and tax rates for the financial year 2023-2024
    const incomeSlabs = [
      { slab: 0, rate: 0 },
      { slab: 250000, rate: 0.05 },
      { slab: 500000, rate: 0.1 },
      { slab: 1000000, rate: 0.15 },
      { slab: 1500000, rate: 0.2 },
      { slab: 2500000, rate: 0.25 },
      { slab: 5000000, rate: 0.3 }
    ];

    let remainingIncome = incomeInt;
    let advanceTaxAmount = 0;

    // Calculate advance tax based on income slabs and rates
    if(incomeInt>249999){
        for (let i = 1; i < incomeSlabs.length; i++) {
            const { slab, rate } = incomeSlabs[i];
            const taxableIncome = Math.min(remainingIncome, slab - incomeSlabs[i - 1].slab);
            const taxAmount = taxableIncome * rate;
            advanceTaxAmount += taxAmount;
            remainingIncome -= taxableIncome;
          }
    }
    NotificationManager.success("You Tax Calculated Successfully.")
    setAdvanceTax(advanceTaxAmount);
  };

  return (
    <Card variant="outlined" style={{ width: "90%" ,margin:"auto",marginTop:"50px",marginBottom:"50px",padding:"40px 20px"}}>
            <Box fontWeight={"bold"} fontSize={30}>Advance Tax Calculator</Box>
            <Grid container spacing={12} lg={8} md={10} sm={12} xs={12}  margin={"auto"}>
            <Grid container spacing={2} style={{width:"50%",margin:"auto"}}>
                <Grid item lg={12} md={12} sm={12} xs={12} >

                    <TextField
                        fullWidth
                        type="number"
                        name="income"
                        label="Your Yearly Income"
                        onChange={handleIncomeChange}
                        value={income || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <Button
                        fullWidth
                        onClick={calculateAdvanceTax}
                        variant="contained"
                        style={{padding:"10px 0px"}}
                        >
                            Calculate
                        </Button>
                </Grid>

            </Grid>
            
            <Grid container spacing={2} style={{width:"50%",margin:"auto"}}>
                <Grid item lg={12} md={12} sm={12} xs={12} fontSize={30}>
                   {`Your Advance Tax Is: ${advanceTax?advanceTax:0}`}
                   
                </Grid>

            </Grid>
            </Grid>
            

        </Card >
  );
};

export default AdvanceTaxCalculator;
