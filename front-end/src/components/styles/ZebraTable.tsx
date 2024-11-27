import {styled} from "@mui/material/styles";
import {TableRow} from "@mui/material";

export const ZebraTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default,
    },
}));