import { Backdrop, CircularProgress } from '@mui/material'


function LoaderManager({ loading }) {
    
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

import PropTypes from "prop-types";

LoaderManager.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LoaderManager
