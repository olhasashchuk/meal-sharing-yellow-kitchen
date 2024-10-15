"use client";
import {Radio, Typography} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { SectionFrame } from '../frames/SectionFrame';
import { sortingOptions } from "../fetches/useSortingMeals";

export const SortingMeal = ({ setSortingValue }) => {
  const handleInputChange = (event) => {
    setSortingValue(event.target.value)
  } 

  return (
    <SectionFrame>
      <FormControl>
        <FormLabel id="sortRadioButtons">
          <Typography 
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "text.primary", flex: 1}} 
          >
            Sorting meals
          </Typography>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="sortRadioButtons"
          name="sortRadioButtons"
          onChange={handleInputChange}
        >
          {sortingOptions.map((item, index)=> (
            <FormControlLabel 
            key={`RadioItem-${index}`} 
            value={item.value} 
            control={<Radio />} 
            label={item.label} 
            />
          ))}
        </RadioGroup>
      </FormControl>
    </SectionFrame>
  );
}