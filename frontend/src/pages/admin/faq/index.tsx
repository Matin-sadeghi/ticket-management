import { Box } from "@mui/material";
import Header from "../../../components/admin/Header";
import { tokens } from "../../../theme";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import AccordionData from "../../../components/admin/AccordionData";

const FAQ = () => {
  const colors = tokens("dark");

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="FAQ" subTitle="Frequently Asked Questions Page" />
      </Box>
      <Box>
        <AccordionData
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget."
          title="An Important Question"
          color={colors.greenAccent[500]}
          icon={<GridExpandMoreIcon />}
          open={true}
        />
        <AccordionData
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget."
          title="An Important Question"
          color={colors.greenAccent[500]}
          icon={<GridExpandMoreIcon />}
          open={false}
        />

        <AccordionData
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget."
          title="An Important Question"
          color={colors.greenAccent[500]}
          icon={<GridExpandMoreIcon />}
          open={true}
        />
      </Box>
    </Box>
  );
};

export default FAQ;
