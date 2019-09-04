//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//data
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin_donnan:quixote229@buttonintranet-jlpsn.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});

//test data
const testName = "aldonnan";
const testEmail = "alex.donnan@gmail.com";
const testPwd = "imtesting";

//check for user and add if not there
//connect to mongodb
async function userCheck(username, useremail, password) {
	var qResult = [];
	client.connect(err => {
	 	const collection = client.db("users").collection("user information");
	 	var query = {userName: username, userEmail: useremail};
	 	collection.find(query, function(err, result) {
	 		result.each(function(err, el) {
	 			if (el != null) {
	 				console.log(el);
		 			var match = bcrypt.compare(password, el.passwordHash);
					if (match) {
						console.log("Correct!");
					} else {
						console.log("Wrong!");
					}
				}
	 		});
		});
		client.close();
	});
}

userCheck(testName, testEmail, testPwd);