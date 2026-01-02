import {ApiResponse} from '../utils/ApiResponse.js';

const healthCheck = (req, res) => {
  res.status(200).json(new ApiResponse(200, 'Healthcheck successful !!'));
};

export default healthCheck;
