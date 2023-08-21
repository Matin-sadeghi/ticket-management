import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import { FC, ReactNode } from "react";
import { tokens } from "../../theme";
interface IPropsType {
  title: string;
  text: string;
  icon: ReactNode;
  color: string;
  open: boolean;
}
const AccordionData: FC<IPropsType> = ({ title, text, icon, color, open }) => {
  const colors = tokens("dark")
  return (
    <Accordion sx={{backgroundColor:colors.primary[400]}} defaultExpanded={open}>
      <AccordionSummary expandIcon={icon}>
        <Typography color={color} variant="h5">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{text}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionData;
