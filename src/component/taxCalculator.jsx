import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, Card } from '@mui/material';
import { NotificationManager } from 'react-notifications';

const AdvanceTaxCalculator = () => {
  const [income, setIncome] = useState('0');
  const [advanceTax, setAdvanceTax] = useState({jun:"",sept:"",dec:"",march:""});

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const calculateAdvanceTax = () => {
    if(!income){
      return NotificationManager.error("Tax should be Requird.")
    }
    const incomeInt = parseInt(income);
    if(incomeInt<=10000){
        return NotificationManager.error("Tax should be greather than 10000  .")
    }

    let first = Math.round((incomeInt*15)/100);
    let second = Math.round((incomeInt*45)/100-first);
    let third = Math.round((incomeInt*75)/100-first+second)
    let fourth = Math.round((incomeInt*100)/100-first+second+third)

    NotificationManager.success("You Tax Calculated Successfully.")
    setAdvanceTax({...advanceTax,jun:first,sept:second,dec:third,march:fourth});
  };

  return (
    <Card variant="outlined" style={{ width: "80%" ,margin:"auto",marginTop:"50px",marginBottom:"50px",padding:"40px 20px"}}>
            <Box fontWeight={"bold"} fontSize={30}>Advance Tax Calculator</Box>
            <Grid container spacing={12} lg={8} md={10} sm={12} xs={12}  margin={"auto"}>
            <Grid container spacing={2} lg={6} md={6} sm={10} xs={10} style={{margin:"auto"}}>
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
            
            <Grid container spacing={2} lg={6} md={6} sm={10} xs={10} style={{margin:"auto"}}>
                <Grid item lg={12} md={12} sm={12} xs={12} fontSize={30}>
                  <Box fontSize={lg} p={10}>Your Advance Tax :-</Box>
                  <Box fontSize={md} p={10}>{`For 15th June (15%): ${advanceTax.jun}`}</Box>
                  <Box fontSize={md} p={10}>{`For 15th Sept (45%): ${advanceTax.sept}`}</Box>
                  <Box fontSize={md} p={10}>{`For 15th June (75%): ${advanceTax.dec}`}</Box>
                  <Box fontSize={md} p={10}>{`For 15th June (100%): ${advanceTax.march}`}</Box>
                </Grid>

            </Grid>
            </Grid>
            

        </Card >
  );
};

export default AdvanceTaxCalculator;
