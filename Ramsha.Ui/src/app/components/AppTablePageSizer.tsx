import { Select, MenuItem, Typography } from "@mui/material"
interface RowsPerPageOptions {
    label?: string
    value: number
}

type Props = {
    pageSize: number;
    onPageSizeChange: (newSize: number) => void
    options: RowsPerPageOptions[] | number[]
    totalCount?: number
    allowAll?: boolean

}
const AppTablePageSizer = ({ onPageSizeChange, options, pageSize, allowAll, totalCount }: Props) => {
    return (
        <Select size="small" fullWidth value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value || pageSize))}>
            {
                options?.map(opt => {
                    const numOption = typeof opt === "number"
                    return (
                        <MenuItem key={numOption ? opt : opt.value} value={numOption ? opt : opt.value}>
                            <Typography
                                sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                            >
                                {numOption ? opt : opt.label}
                            </Typography>
                        </MenuItem>
                    )
                })
            }
            {
                allowAll && (
                    <MenuItem value={totalCount || 0}>
                        <Typography
                            sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                        >
                            {'All'}
                        </Typography>
                    </MenuItem>
                )
            }
        </Select>
    )
}

export default AppTablePageSizer