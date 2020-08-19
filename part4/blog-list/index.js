const app = require("./app");
const { PORT } = require("./utils/config");
const logger = require("./utils/logger");

//keep this section in index.js
//the port should be in utils/config.js
app.listen(PORT, () => {
  //put this in utils/logger
  logger.info(`Server running on port ${PORT}`);
});
