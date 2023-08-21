import {
  useState,
  Dispatch,
  SetStateAction,
  FC,
  ReactNode,
  useContext,
} from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";
import userImg from "./../../../assets/user.png";
import {
  HomeOutlined,
  PeopleOutline,
  ContactsOutlined,
  ReceiptOutlined,
  PersonOutline,
  CalendarTodayOutlined,
  HelpOutline,
  BarChartOutlined,
  PieChartOutline,
  TimelineOutlined,
  MenuOutlined,
  MapOutlined,
  ConfirmationNumber,
} from "@mui/icons-material";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";

interface IItems {
  title: string;
  to: string;
  icon: ReactNode;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const Item: FC<IItems> = ({ title, to, icon, selected, setSelected }) => {
  const colors = tokens("dark");
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[200],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} className="link" />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const colors = tokens("dark");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <Box
      sx={{
        "& .ps-menuitem-root:hover": {
          color: "#868dfb !important",
        },
        "& .ps-menu-button:hover": {
          backgroundColor: "#1d1f37 !important",
        },

        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .css-1jx5vff.ps-collapsed": {},
        "& .css-1jx5vff": {
          height: "100% ",
        },
      }}
    >
      <Sidebar
        transitionDuration={500}
        backgroundColor={colors.primary[400]}
        collapsed={isCollapsed}
      >
        <Menu>
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlined /> : null}
            style={{
              margin: "10px 0px 20px 0px",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {" "}
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined
                    style={{
                      color: colors.grey[100],
                    }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={userImg}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Site Name
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin Name
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin/dashboard"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            {user?.role.includes("GENERALMANAGER") || user?.role.includes("ADMIN") ? (
              <Item
                title="users"
                to="/admin/users"
                icon={<PeopleOutline />}
                selected={selected}
                setSelected={setSelected}
              />
            ) : null}

            <Item
              title="Tickets"
              to="/admin/tickets"
              icon={<ConfirmationNumber />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/admin/contacts"
              icon={<ContactsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/admin/invoices"
              icon={<ReceiptOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/admin/form"
              icon={<PersonOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/admin/calendar"
              icon={<CalendarTodayOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/admin/faq"
              icon={<HelpOutline />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/admin/bar"
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/admin/pie"
              icon={<PieChartOutline />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/admin/line"
              icon={<TimelineOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/admin/geography"
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
