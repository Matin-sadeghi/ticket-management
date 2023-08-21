import { Box, IconButton, InputBase } from "@mui/material";
// import { useContext } from "react";
import {
  // ColorModeContext,
  // ColorModeContextType,
  tokens,
} from "./../../../theme";
import { BiAbacus } from "react-icons/bi";

const Topbar = () => {
  
  const colors = tokens("dark");
  // const colorMode = useContext(ColorModeContext) as ColorModeContextType;
  return (
    <Box justifyContent="space-between" p={2} display="flex">
      {/* SEARCH BAR */}
      <Box
        display="flex"
        borderRadius="3px"
        sx={{ backgroundColor: colors.primary[400] }}
      >
        <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
        <IconButton type="button" sx={{ p: 1 }}>
          <BiAbacus />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
        <BiAbacus />
        </IconButton>
        <IconButton>
          <BiAbacus />
        </IconButton>
        <IconButton>
          <BiAbacus />
        </IconButton>
        <IconButton>
          <BiAbacus />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
