import { FC, useContext, useEffect, useState } from "react";
import {
  FormControl,
  Fade,
  Modal,
  Box,
  Backdrop,
  MenuItem,
  SelectChangeEvent,
  Select,
  OutlinedInput,
  Button,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import { AdminContext, AdminContextType } from "../../context/AdminContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IPropsTypeModal {
  open: boolean;
  handleClose: any;
  userId: number;
}
interface IPropsTypeForm {
  userId: number;
  handleClose: any;
}



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = ["GENERALMANAGER", "USER", "ADMIN", "EDITOR", "WRITER"];

function getStyles(name: string, role: readonly string[], theme: Theme) {
  return {
    fontWeight:
      role.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectPlaceholder: FC<IPropsTypeForm> = ({
  userId,
  handleClose,
}) => {
  const { getUserById, updateUserRole } = useContext(
    AdminContext
  ) as AdminContextType;
  const theme = useTheme();
  const [role, setRole] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof role>) => {
    const {
      target: { value },
    } = event;
    setRole(typeof value === "string" ? value.split(",") : value);
  };

  const formik = useFormik({
    initialValues: { roles: [] },
    onSubmit: async (_values) => {
      await updateUserRole(role, userId);
      handleClose();
    },
  });

  useEffect(() => {
    const start = async () => {
      const selectedUser = await getUserById(userId);
      setRole(selectedUser.role);
    };
    start();
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
          <Select
            multiple
            displayEmpty
            value={role}
            name="roles"
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Role</em>;
              }
              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em>Placeholder</em>
            </MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r} style={getStyles(r, role, theme)}>
                {r}
              </MenuItem>
            ))}
          </Select>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Role
          </Button>
        </FormControl>
      </form>
    </div>
  );
};

const RoleModal: FC<IPropsTypeModal> = ({ open, handleClose, userId }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <MultipleSelectPlaceholder
              userId={userId}
              handleClose={handleClose}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default RoleModal;
