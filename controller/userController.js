const User = require("../models/User");
const csv = require("csvtojson");
const fileParser = require("json2csv").Parser;
const importData = async (req, res) => {
  try {
    const userData = [];
    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (let i = 0; i < response.length; i++) {
          userData.push({
            name: response[i].Name,
            email: response[i].Email,
            mobile: response[i].Mobile,
          });
        }
        await User.insertMany(userData);
      });
    res.send({ status: 200, sucess: true, msg: "file imported sucessfully" });
  } catch (error) {
    res.send({ status: 400, sucess: false, msg: error.message });
  }
};

const exportData = async (req, res) => {
  try {
    let users = [];

    let userData = await User.find({});
    userData.forEach((user) => {
      const { name, email, mobile } = user;

      users.push({ name, email, mobile });
    });

    const csvFilds = ["Name", "Email", "Mobile"];
    const csvParser = new fileParser({ csvFilds });
    const csvData = csvParser.parse(users);

    res.setHeader("Content-type", "text/csv");
    res.setHeader("Content-Disposition", "attatchment: filename=userData.csv");
    res.status(200).end(csvData);
  } catch (error) {
    res.send({ status: 400, sucess: false, msg: error.message });
  }
};

module.exports = { importData, exportData };
