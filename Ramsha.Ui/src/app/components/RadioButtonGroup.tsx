import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material"


interface Props {
    options: any[]
    onChange: (event: any) => void;
    selectedValue: string

}

const RadioButtonGroup = ({ options, onChange, selectedValue }: Props) => {
    return (
        <FormControl component={'fieldset'}>
            <RadioGroup onChange={onChange} value={selectedValue}>
                {
                    options.map((option) => (
                        <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                    ))
                }
            </RadioGroup>

        </FormControl>
    )
}

export default RadioButtonGroup