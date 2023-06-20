import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Box, Card } from '@mui/material';
import { NotificationManager } from 'react-notifications';

const HraCalculator = () => {
    const [salary, setSalary] = useState('0');
    const [hraAmount, setHraAmount] = useState('0');
    const [rentPaid, setRentPaid] = useState('0');
    const [city, setCity] = useState('metro');
    const [hraExemption, setHraExemption] = useState('');

    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };

    const handleHraAmountChange = (e) => {
        setHraAmount(e.target.value);
    };

    const handleRentPaidChange = (e) => {
        setRentPaid(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const calculateHraExemption = () => {
        if(salary==""){
            return NotificationManager.error("Salary Should be required.")
        }
        const salaryInt = parseInt(salary);
        if(salaryInt<1){
            return NotificationManager.error("Salary Should be greather than 0 .")
        }
        const hraAmountInt = parseInt(hraAmount);
        const rentPaidInt = parseInt(rentPaid);

        let hraExemptionAmount = 0;

        if (hraAmountInt > 0 && rentPaidInt > 0) {
            const isMetroCity = city === 'metro';

            const hraExemption1 = hraAmountInt;

            const hraExemption2 = isMetroCity ? (50 / 100) * salaryInt : (40 / 100) * salaryInt;

            const hraExemption3 = rentPaidInt - (0.1 * salaryInt);

            hraExemptionAmount = Math.min(hraExemption1, hraExemption2, hraExemption3);
            NotificationManager.success("You HRA Calculated Successfully.")
            setHraExemption(hraExemptionAmount);
        }
       else{
        const isMetroCity = city === 'metro';
        const hraExemption2 = isMetroCity ? (50 / 100) * salaryInt : (40 / 100) * salaryInt;
        hraExemptionAmount = hraExemption2;
        NotificationManager.success("You HRA Calculated Successfully.")
        setHraExemption(hraExemptionAmount);
       }
       
    };

    return (
        <Card variant="outlined" style={{ width: "90%" ,margin:"auto",marginTop:"50px",padding:"40px 20px"}}>
            <Box fontWeight={"bold"} fontSize={30}>HRA Calculator</Box>
            <Grid container spacing={12} lg={8} md={10} sm={12} xs={12}  margin={"auto"}>
            <Grid container spacing={2} style={{width:"50%",margin:"auto"}}>
                <Grid item lg={12} md={12} sm={12} xs={12} >

                    <TextField
                        fullWidth
                        type="number"
                        name="salary"
                        label="Your Salary"
                        onChange={handleSalaryChange}
                        value={salary || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <TextField
                        fullWidth
                        sx={{ mb: 4 }}
                        type="number"
                        name="hraAmount"
                        label="HRA Amount"
                        onChange={handleHraAmountChange}
                        value={hraAmount || ""}
                        errorMessages={["this field is required"]}
                        validators={["required"]}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} mt={-4}>
                    <TextField
                        fullWidth
                        type="number"
                        name="rentPaid"
                        label="Youe House Rent"
                        onChange={handleRentPaidChange}
                        value={rentPaid || ""}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <TextField
                        fullWidth
                        select
                        sx={{ mb: 4 }}
                        type="text"
                        name="city"
                        label="Select Your City"
                        onChange={handleCityChange}
                        value={city || ""}
                        errorMessages={["this field is required"]}
                        validators={["required"]}>
                        <MenuItem disabled value="">Select City</MenuItem>
                        <MenuItem value="metro">Metro 50%</MenuItem>
                        <MenuItem value="non-metro">Non-Metro 40%</MenuItem>
                    </TextField>
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <Button
                        fullWidth
                        onClick={calculateHraExemption}
                        variant="contained"
                        style={{padding:"10px 0px",marginTop:"-15px"}}
                        >
                            Calculate
                        </Button>
                </Grid>

            </Grid>
            
            <Grid container spacing={2} style={{width:"50%",margin:"auto"}}>
                <Grid item lg={12} md={12} sm={12} xs={12} fontSize={30}>
                   {`Your Calculated HRA Is: ${hraExemption?hraExemption:0}`}
                   
                </Grid>

            </Grid>
            </Grid>
            

        </Card >
    );
};

export default HraCalculator;
