const User = require("../models/User");
const csv = require("csvtojson");
const importData = async (req, res) => {
  try {
    const userData = []
    csv()
      .fromFile(req.file.path)
      .then(async(response) => {
        for (let i = 0; i < response.length; i++) {
            userData.push({
                name:response[i].Name,
                email:response[i].Email,
                mobile:response[i].Mobile
            })
        }
        await User.insertMany(userData)
      });
    res.send({ status: 200, sucess: true, msg: "file imported sucessfully" });
  } catch (error) {
    res.send({ status: 400, sucess: false, msg: error.message });
  }
};

module.exports = importData;
