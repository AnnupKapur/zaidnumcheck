const moment = require('moment');

const post_idcheck = (req, res) => {
	const strID = req.params[':id'];

	// ERROR ID LENGTH
	if(strID.length!==13){
		res.json(
			{
				status:{
					string: 'fail',
					pass: false,
				},
				errors: ['ID number must be only 13 digits']
			}
		)
	}

	const regex = new RegExp(/\d{13}/g);

	// CHECK ID IS NUMBERS
	if(strID.length === 13 && !regex.test(strID)){
		res.json(
			{
				status:{
					string: 'fail',
					pass: false,
				},
				errors: ['ID number must be only numbers, no letters, no spaces and no special characters']
			}
		)
	}

  // CHECK DATE, GENDER, CHECKSUM
  if(strID.length === 13 && regex.test(strID)){

    const strDateID = strID.slice(0,6);
    const strGenderID = strID.slice(7,11);

    const strDate = req.query.strdob; 

  }
}