import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, InputAdornment, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FieldValues, useForm } from "react-hook-form";
import AppDatePickerInput from "../../../app/components/AppDatePicker";
import AppSelector from "../../../app/components/AppSelector";
import AppTextInput from "../../../app/components/AppTextInput";
import { useApplyDiscount } from "../../../app/hooks/invenroyHooks";
import { DiscountType } from "../../../app/models/inventories/inventory";
import { StockPrice } from "../../../app/models/suppliers/supplierInventoryItem";
import AppDateTimeProvider from "../../../app/providers/AppDateTimeProvider";
import { discountSchema, DiscountSchema } from "./schemas";


type Props = {
    item: {
        inventoryItemId: string;
        sku: string;
        activePrice: StockPrice;
    },
}
const DiscountForm = ({ item }: Props) => {

    const { control, handleSubmit, formState: { isSubmitting }, watch } = useForm<FieldValues>({
        defaultValues: {
            value: '1',
            type: 'Percentage',
            startDate: dayjs(new Date()),
            endDate: dayjs(new Date()).add(1, "day")
        },
        resolver: zodResolver(discountSchema),
        mode: 'onSubmit'
    })


    const { apply } = useApplyDiscount(item.inventoryItemId)

    const selectedType = watch('type') as DiscountType;

    const discountValue = parseFloat(watch('value') || '0');

    // Calculate the discounted price dynamically
    const calculateDiscountedPrice = () => {
        const originalPrice = item.activePrice.finalPrice; // Assuming `activePrice.value` holds the price
        if (selectedType === 'Percentage') {
            const percentageDiscount = (originalPrice * discountValue) / 100;
            return originalPrice - percentageDiscount;
        } else if (selectedType === 'FixedAmount') {
            return originalPrice - discountValue;
        }
        return originalPrice;
    };

    const discountedPrice = calculateDiscountedPrice();

    const onSubmit = async (data: any) => {

        console.log(data)
        const { endDate, startDate, type, value } = data as DiscountSchema

        await apply({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            type: type as DiscountType,
            value: parseInt(value)
        })
    }

    return (
        <>
            <Grid onSubmit={handleSubmit(onSubmit)} component={'form'} sx={{ p: 2 }} container spacing={2} >
                <Grid item xs={12} md={6}>
                    <AppSelector
                        control={control}
                        name="type"
                        options={[{ id: 'Percentage', name: 'Percentage' }, { id: 'FixedAmount', name: 'Fixed Amount' }]}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <AppTextInput
                        InputProps={{
                            startAdornment: (
                                < InputAdornment position="start" >
                                    {
                                        selectedType === 'Percentage' ? '%' : '$'
                                    }
                                </InputAdornment>
                            )
                        }}
                        control={control}
                        name="value"
                        label="Discount Value"
                        type="number"
                        fullWidth
                    />
                </Grid>
                <AppDateTimeProvider>
                    <Grid item xs={12} md={6}>
                        <AppDatePickerInput
                            control={control}
                            name="startDate"
                            label="Start Date"
                            fullWidth
                        />
                    </Grid>  <Grid item xs={12} md={6}>
                        <AppDatePickerInput
                            control={control}
                            name="endDate"
                            label="End Date"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Original Price: ${item.activePrice.finalPrice.toFixed(2)}
                        </Typography>
                        <Typography variant="h6" color="primary">
                            Price After Discount: ${discountedPrice > 0 ? discountedPrice.toFixed(2) : '0.00'}
                        </Typography>
                    </Grid>
                    <LoadingButton loading={isSubmitting} type="submit">submit</LoadingButton>
                </AppDateTimeProvider >
            </Grid>

        </>

    )
}

export default DiscountForm