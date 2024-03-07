/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  Button,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from "@mui/material";
import { styleSelectCaptian } from "../../../JsStyles/Styles";
import { getCaptians } from "../../../Api/manager";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";

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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SelectCaptian({ open, setOpen, handleApproval }) {
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCaptians();
  }, []);

  const fetchCaptians = async () => {
    try {
      const res = await getCaptians();
      setNames(res.data.employees);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  //   const handleAssigning  = async() => {
  //     try {
  //         const res = await setCaptian
  //     } catch (error) {

  //     }
  //   }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      {loading ? (
        <LoaderManager loading={loading} />
      ) : (
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={styleSelectCaptian}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Allocate Captian
            </Typography>
            <FormControl sx={{ mt: 4, width: 335 }}>
              <InputLabel id="demo-multiple-name-label">Name</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {names.map(({ name, _id }) => (
                  <MenuItem
                    key={_id}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DialogActions className="mt-4">
              <Button onClick={handleApproval}>Submit</Button>
            </DialogActions>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default SelectCaptian;
